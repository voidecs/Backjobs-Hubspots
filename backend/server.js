const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const HUBSPOT_BASE_URL = "https://api.hubapi.com";
const HUBSPOT_API_VERSION = "2026-03";

const hubspotHeaders = {
  Authorization: `Bearer ${process.env.HUBSPOT_SERVICE_KEY}`,
  "Content-Type": "application/json",
};

// ==================================================
// HUBSPOT HELPERS
// ==================================================

async function hubspotPost(url, data) {
  return axios.post(url, data, {
    headers: hubspotHeaders,
  });
}

async function hubspotGet(url) {
  return axios.get(url, {
    headers: hubspotHeaders,
  });
}

// ==================================================
// INDUSTRY MAPPING
// ==================================================

function mapIndustry(industry) {
  if (!industry) return undefined;

  const value = String(industry).trim();

  const industryMap = {
    Technology: "INFORMATION_TECHNOLOGY_AND_SERVICES",

    technology: "INFORMATION_TECHNOLOGY_AND_SERVICES",

    "Computer Software": "COMPUTER_SOFTWARE",
    "Computer Software": "COMPUTER_SOFTWARE",

    "Computer Hardware": "COMPUTER_HARDWARE",

    "Electrical / Electronic Manufacturing":
      "ELECTRICAL_ELECTRONIC_MANUFACTURING",

    "Electrical & Electronic Manufacturing":
      "ELECTRICAL_ELECTRONIC_MANUFACTURING",

    "Commercial Real Estate":
      "COMMERCIAL_REAL_ESTATE",

    "Consumer Electronics":
      "CONSUMER_ELECTRONICS",
  };

  // If frontend already sends HubSpot's internal value,
  // keep it unchanged.
  if (industryMap[value]) {
    return industryMap[value];
  }

  return value;
}

// ==================================================
// LEAD SOURCE MAPPING
// ==================================================

function mapLeadSource(source) {
  if (!source) return "";

  const value = String(source).trim().toLowerCase();

  const sourceMap = {
    website: "website",
    referral: "referral",
    exhibition: "exhibition",
    other: "other",
  };

  return sourceMap[value] || "other";
}

// ==================================================
// CONTACT SEARCH
// ==================================================

async function findContactByEmail(email) {
  try {
    const response = await hubspotPost(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/search`,
      {
        filterGroups: [
          {
            filters: [
              {
                propertyName: "email",
                operator: "EQ",
                value: email,
              },
            ],
          },
        ],
        properties: [
          "firstname",
          "lastname",
          "email",
          "phone",
          "company",
          "city",
        ],
        limit: 1,
      }
    );

    return response.data.results?.[0] || null;
  } catch (error) {
    console.error(
      "Contact search failed:",
      error.response?.data || error.message
    );

    return null;
  }
}

// ==================================================
// COMPANY SEARCH
// ==================================================

async function findCompanyByName(name) {
  try {
    const response = await hubspotPost(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/companies/search`,
      {
        filterGroups: [
          {
            filters: [
              {
                propertyName: "name",
                operator: "EQ",
                value: name,
              },
            ],
          },
        ],
        properties: [
          "name",
          "industry",
          "city",
        ],
        limit: 1,
      }
    );

    return response.data.results?.[0] || null;
  } catch (error) {
    console.error(
      "Company search failed:",
      error.response?.data || error.message
    );

    return null;
  }
}

// ==================================================
// ASSOCIATE CONTACT → COMPANY
// ==================================================

async function associateContactWithCompany(contactId, companyId) {
  try {
    await axios.put(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/${contactId}/associations/company/${companyId}/1`,
      {},
      {
        headers: hubspotHeaders,
      }
    );

    console.log(
      `Contact ${contactId} associated with company ${companyId}`
    );
  } catch (error) {
    console.error(
      "Contact-company association failed:",
      error.response?.data || error.message
    );
  }
}

// ==================================================
// HEALTH CHECK
// ==================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "BACKJOBS backend is running",
  });
});

// ==================================================
// TEST HUBSPOT CONNECTION
// ==================================================

app.get("/api/test-hubspot", async (req, res) => {
  try {
    const response = await hubspotGet(
      `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts?limit=1`
    );

    res.json({
      success: true,
      status: response.status,
      data: response.data,
    });
  } catch (error) {
    console.error("=================================");
    console.error("HUBSPOT TEST ERROR");
    console.error("=================================");

    console.error(
      "Status:",
      error.response?.status || "No status"
    );

    console.error(
      "Response:",
      error.response?.data || error.message
    );

    console.error("=================================");

    res.status(error.response?.status || 500).json({
      success: false,
      status: error.response?.status || 500,
      error: error.response?.data || error.message,
    });
  }
});

// ==================================================
// PRODUCT INTEREST → HUBSPOT
// ==================================================

app.post("/api/product-interest", async (req, res) => {
  try {
    const form = req.body;

    console.log("");
    console.log("=================================");
    console.log("PRODUCT INTEREST RECEIVED");
    console.log("=================================");
    console.log(form);
    console.log("=================================");

    // ==================================================
    // VALIDATION
    // ==================================================

    if (!form.firstName || !form.lastName || !form.email) {
      return res.status(400).json({
        success: false,
        message:
          "First name, last name and email are required.",
      });
    }

    if (!form.company) {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    if (!form.product) {
      return res.status(400).json({
        success: false,
        message: "Product is required.",
      });
    }

    // ==================================================
    // NORMALIZE VALUES
    // ==================================================

    const industry = mapIndustry(form.industry);

    const leadSource = mapLeadSource(form.leadSource);

    console.log("Normalized values:");
    console.log({
      industry,
      leadSource,
    });

    // ==================================================
    // 1. CONTACT
    // ==================================================

    console.log("Creating / finding HubSpot contact...");

    let contactId;

    const existingContact = await findContactByEmail(
      form.email
    );

    if (existingContact) {
      contactId = existingContact.id;

      console.log(
        "Existing HubSpot contact found:",
        contactId
      );

      // Update existing contact
      await axios.patch(
        `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/${contactId}`,
        {
          properties: {
            firstname: form.firstName,
            lastname: form.lastName,
            phone: form.phone || "",
            city: form.city || "",
            company: form.company || "",
          },
        },
        {
          headers: hubspotHeaders,
        }
      );

      console.log("Existing contact updated.");
    } else {
      const contactResponse = await hubspotPost(
        `${HUBSPOT_BASE_URL}/crm/objects/${HUBSPOT_API_VERSION}/contacts`,
        {
          properties: {
            firstname: form.firstName,
            lastname: form.lastName,
            email: form.email,
            phone: form.phone || "",
            city: form.city || "",
            company: form.company || "",
          },
        }
      );

      contactId = contactResponse.data.id;

      console.log(
        "HubSpot contact created:",
        contactId
      );
    }

    // ==================================================
    // 2. COMPANY
    // ==================================================

    console.log("Creating / finding HubSpot company...");

    let companyId;

    const existingCompany = await findCompanyByName(
      form.company
    );

    if (existingCompany) {
      companyId = existingCompany.id;

      console.log(
        "Existing HubSpot company found:",
        companyId
      );
    } else {
      const companyProperties = {
        name: form.company,
        city: form.city || "",
      };

      // Only send industry when we have a valid value
      if (industry) {
        companyProperties.industry = industry;
      }

      const companyResponse = await hubspotPost(
        `${HUBSPOT_BASE_URL}/crm/objects/${HUBSPOT_API_VERSION}/companies`,
        {
          properties: companyProperties,
        }
      );

      companyId = companyResponse.data.id;

      console.log(
        "HubSpot company created:",
        companyId
      );
    }

    // ==================================================
    // 3. ASSOCIATE CONTACT WITH COMPANY
    // ==================================================

    await associateContactWithCompany(
      contactId,
      companyId
    );

    // ==================================================
    // 4. CREATE DEAL
    // ==================================================

    console.log("Creating HubSpot deal...");

    /*
      IMPORTANT:

      We are deliberately NOT sending:

        product_interest
        number_of_devices
        lead_source_custom
        salesperson_name

      because those properties do not exist in your
      HubSpot portal according to the API errors.

      Instead, we put those form details into the
      standard HubSpot deal "description" property.
    */

    const dealProperties = {
      dealname: `${form.product} - ${form.company}`,

      dealstage:
        form.dealStage || "appointmentscheduled",

      pipeline: "default",
    };

    // Deal value
    if (
      form.dealValue !== undefined &&
      form.dealValue !== null &&
      String(form.dealValue).trim() !== ""
    ) {
      dealProperties.amount =
        String(form.dealValue);
    }

    // Expected close date
    if (form.closeDate) {
      dealProperties.closedate =
        `${form.closeDate}T00:00:00Z`;
    }

    // Store the extra form information in the
    // standard HubSpot deal description.
    const descriptionParts = [
      `Product: ${form.product || ""}`,
      `Number of Devices: ${form.devices || ""}`,
      `Lead Source: ${leadSource || ""}`,
      `Salesperson: ${form.salesperson || ""}`,
      `Lead Status: ${form.leadStatus || ""}`,
      `Currency: ${form.currency || ""}`,
      `Customer Notes: ${form.notes || ""}`,
    ];

    dealProperties.description =
      descriptionParts.join("\n");

    console.log(
      "Deal properties being sent:",
      dealProperties
    );

    const dealResponse = await hubspotPost(
      `${HUBSPOT_BASE_URL}/crm/objects/${HUBSPOT_API_VERSION}/deals`,
      {
        properties: dealProperties,

        associations: [
          {
            to: {
              id: contactId,
            },
            types: [
              {
                associationCategory:
                  "HUBSPOT_DEFINED",
                associationTypeId: 3,
              },
            ],
          },
          {
            to: {
              id: companyId,
            },
            types: [
              {
                associationCategory:
                  "HUBSPOT_DEFINED",
                associationTypeId: 5,
              },
            ],
          },
        ],
      }
    );

    const dealId = dealResponse.data.id;

    console.log(
      "HubSpot deal created:",
      dealId
    );

    // ==================================================
    // SUCCESS
    // ==================================================

    console.log("");
    console.log("=================================");
    console.log("HUBSPOT SUCCESS");
    console.log("=================================");
    console.log({
      contactId,
      companyId,
      dealId,
    });
    console.log("=================================");

    return res.status(201).json({
      success: true,

      message:
        "Product interest successfully sent to HubSpot.",

      hubspot: {
        contactId,
        companyId,
        dealId,
      },
    });
  } catch (error) {
    console.error("");
    console.error("=================================");
    console.error("HUBSPOT ERROR");
    console.error("=================================");

    console.error(
      "Status:",
      error.response?.status || "No status"
    );

    console.error(
      "Response:",
      error.response?.data || error.message
    );

    console.error("=================================");

    return res.status(
      error.response?.status || 500
    ).json({
      success: false,

      message:
        "Failed to send product interest to HubSpot.",

      error:
        error.response?.data ||
        error.message,
    });
  }
});
// ==================================================
// DASHBOARD DATA
// ==================================================

async function getAllHubSpotObjects(objectType, properties = []) {
  const results = [];
  let after = undefined;

  try {
    do {
      const params = new URLSearchParams();

      params.append("limit", "100");

      if (properties.length > 0) {
        params.append("properties", properties.join(","));
      }

      if (after) {
        params.append("after", after);
      }

      const response = await hubspotGet(
        `${HUBSPOT_BASE_URL}/crm/v3/objects/${objectType}?${params.toString()}`
      );

      results.push(...(response.data.results || []));

      after = response.data.paging?.next?.after;

    } while (after);

    return results;

  } catch (error) {
    console.error(
      `Failed to fetch HubSpot ${objectType}:`,
      error.response?.data || error.message
    );

    throw error;
  }
}


// ==================================================
// DASHBOARD API
// ==================================================

app.get("/api/dashboard", async (req, res) => {

  try {

    console.log("");
    console.log("=================================");
    console.log("LOADING HUBSPOT DASHBOARD DATA");
    console.log("=================================");

    const [
      contacts,
      companies,
      deals,
    ] = await Promise.all([

      getAllHubSpotObjects(
        "contacts",
        [
          "firstname",
          "lastname",
          "email",
          "company",
          "city",
          "createdate",
        ]
      ),

      getAllHubSpotObjects(
        "companies",
        [
          "name",
          "industry",
          "city",
          "createdate",
        ]
      ),

      getAllHubSpotObjects(
        "deals",
        [
          "dealname",
          "amount",
          "dealstage",
          "pipeline",
          "closedate",
          "createdate",
          "description",
        ]
      ),

    ]);


    // ==================================================
    // DEAL CALCULATIONS
    // ==================================================

    let pipelineValue = 0;
    let wonDeals = 0;
    let openDeals = 0;

    deals.forEach((deal) => {

      const properties = deal.properties || {};

      const amount =
        Number(properties.amount || 0);

      pipelineValue += amount;

      const stage =
        properties.dealstage || "";

      if (stage === "closedwon") {
        wonDeals++;
      }

      if (
        stage !== "closedwon" &&
        stage !== "closedlost"
      ) {
        openDeals++;
      }

    });


    // ==================================================
    // STAGE LABELS
    // ==================================================

    const stageLabels = {

      appointmentscheduled:
        "Appointment Scheduled",

      qualifiedtobuy:
        "Qualified to Buy",

      presentationscheduled:
        "Presentation Scheduled",

      decisionmakerboughtin:
        "Decision Maker Bought In",

      contractsent:
        "Contract Sent",

      closedwon:
        "Closed Won",

      closedlost:
        "Closed Lost",

    };


    // ==================================================
    // RECENT DEALS
    // ==================================================

    const recentDeals = deals
      .sort((a, b) => {

        const dateA =
          new Date(
            a.properties?.createdate || 0
          ).getTime();

        const dateB =
          new Date(
            b.properties?.createdate || 0
          ).getTime();

        return dateB - dateA;

      })
      .slice(0, 10)
      .map((deal) => {

        const p = deal.properties || {};

        let product = "";

        // Product is stored in description by our
        // current Product Interest integration.
        if (p.description) {

          const match =
            p.description.match(
              /Product:\s*(.*)/
            );

          if (match) {
            product = match[1].trim();
          }

        }

        return {

          id: deal.id,

          name:
            p.dealname || "Unnamed Deal",

          product:
            product || "—",

          amount:
            Number(p.amount || 0),

          stage:
            stageLabels[p.dealstage] ||
            p.dealstage ||
            "—",

          closeDate:
            p.closedate || null,

          createdAt:
            p.createdate || null,

        };

      });


    // ==================================================
    // RECENT CONTACTS
    // ==================================================

    const recentContacts = contacts
      .sort((a, b) => {

        const dateA =
          new Date(
            a.properties?.createdate || 0
          ).getTime();

        const dateB =
          new Date(
            b.properties?.createdate || 0
          ).getTime();

        return dateB - dateA;

      })
      .slice(0, 5)
      .map((contact) => {

        const p =
          contact.properties || {};

        return {

          id: contact.id,

          name:
            `${p.firstname || ""} ${p.lastname || ""}`
              .trim() || "Unnamed Contact",

          email:
            p.email || "—",

          company:
            p.company || "—",

          city:
            p.city || "—",

          createdAt:
            p.createdate || null,

        };

      });


    // ==================================================
    // RESPONSE
    // ==================================================

    const dashboard = {

      totals: {

        contacts:
          contacts.length,

        companies:
          companies.length,

        deals:
          deals.length,

        pipelineValue,

        wonDeals,

        openDeals,

      },

      recentDeals,

      recentContacts,

      updatedAt:
        new Date().toISOString(),

    };


    console.log("Dashboard data:");

    console.log({

      contacts: dashboard.totals.contacts,

      companies: dashboard.totals.companies,

      deals: dashboard.totals.deals,

      pipelineValue:
        dashboard.totals.pipelineValue,

      wonDeals:
        dashboard.totals.wonDeals,

      openDeals:
        dashboard.totals.openDeals,

    });

    console.log("=================================");


    return res.json({

      success: true,

      data: dashboard,

    });

  } catch (error) {

    console.error("");
    console.error("=================================");
    console.error("DASHBOARD ERROR");
    console.error("=================================");

    console.error(
      "Status:",
      error.response?.status || "No status"
    );

    console.error(
      "Response:",
      error.response?.data || error.message
    );

    console.error("=================================");


    return res.status(
      error.response?.status || 500
    ).json({

      success: false,

      message:
        "Failed to load HubSpot dashboard data.",

      error:
        error.response?.data ||
        error.message,

    });

  }

});

// ==================================================
// START SERVER
// ==================================================

app.listen(PORT, () => {
  console.log(
    `BACKJOBS backend running on http://localhost:${PORT}`
  );
});