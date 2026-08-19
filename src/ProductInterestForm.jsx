import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

function ProductInterestForm({ onBack }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    company: "",
    industry: "",
    city: "",

    product: "",
    devices: "",
    dealValue: "",
    currency: "INR",

    dealStage: "appointmentscheduled",
    leadSource: "website",
    leadStatus: "new",
    salesperson: "",

    closeDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    // Basic validation
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim()
    ) {
      setError("Please fill in the required contact information.");
      setLoading(false);
      return;
    }

    if (!form.company.trim()) {
      setError("Please enter the company name.");
      setLoading(false);
      return;
    }

    if (!form.product) {
      setError("Please select a product.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/product-interest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,

            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),

            company: form.company.trim(),
            city: form.city.trim(),

            devices: form.devices
              ? String(form.devices)
              : "",

            dealValue: form.dealValue
              ? String(form.dealValue)
              : "",

            notes: form.notes.trim(),
          }),
        }
      );

      const data = await response.json();

      console.log("BACKEND RESPONSE:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data?.error?.message ||
          data?.message ||
          "Failed to submit product interest."
        );
      }

      setSuccess(true);

      // Reset form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",

        company: "",
        industry: "",
        city: "",

        product: "",
        devices: "",
        dealValue: "",
        currency: "INR",

        dealStage: "appointmentscheduled",
        leadSource: "website",
        leadStatus: "new",
        salesperson: "",

        closeDate: "",
        notes: "",
      });
    } catch (err) {
      console.error("PRODUCT INTEREST ERROR:", err);

      setError(
        err.message ||
        "Something went wrong while submitting the form."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="product-page-header">

        <div>
          <div className="product-breadcrumb">
            Sales
            <span>/</span>
            Leads
            <span>/</span>
            New Product Interest
          </div>

          <h1>New Product Interest</h1>

          <p>
            Capture customer interest and prepare the lead for HubSpot.
          </p>
        </div>

        <button
          type="button"
          className="product-back-button"
          onClick={onBack}
        >
          <ArrowLeft size={15} />
          Back to Leads
        </button>

      </div>


      {/* =====================================================
          SUCCESS
      ===================================================== */}

      {success && (
        <div className="product-success">
          <CheckCircle2 size={22} />

          <div>
            <strong>Product interest submitted</strong>

            <span>
              Contact, company and deal information was successfully
              sent to HubSpot.
            </span>
          </div>
        </div>
      )}


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="product-error">
          <strong>Submission failed</strong>

          <span>{error}</span>
        </div>
      )}


      {/* =====================================================
          FORM
      ===================================================== */}

      <form
        className="product-form"
        onSubmit={handleSubmit}
      >

        {/* ===================================================
            SECTION 01 — CONTACT
        =================================================== */}

        <section className="product-section">

          <div className="section-number">
            01
          </div>

          <div className="section-content">

            <div className="section-heading">
              <h2>Contact Information</h2>

              <p>
                Information about the interested customer.
              </p>
            </div>


            <div className="form-grid">

              <div className="form-field">
                <label>
                  First Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) =>
                    updateField("firstName", e.target.value)
                  }
                  placeholder="Rajesh"
                  required
                />
              </div>


              <div className="form-field">
                <label>
                  Last Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) =>
                    updateField("lastName", e.target.value)
                  }
                  placeholder="Mehta"
                  required
                />
              </div>


              <div className="form-field">
                <label>
                  Email
                  <span>*</span>
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                  placeholder="rajesh@example.com"
                  required
                />
              </div>


              <div className="form-field">
                <label>
                  Phone
                </label>

                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value)
                  }
                  placeholder="+91 98765 43210"
                />
              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            SECTION 02 — COMPANY
        =================================================== */}

        <section className="product-section">

          <div className="section-number">
            02
          </div>

          <div className="section-content">

            <div className="section-heading">
              <h2>Company Information</h2>

              <p>
                Information about the customer's organization.
              </p>
            </div>


            <div className="form-grid">

              <div className="form-field form-field-wide">
                <label>
                  Company Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  value={form.company}
                  onChange={(e) =>
                    updateField("company", e.target.value)
                  }
                  placeholder="ABC Technologies Pvt. Ltd."
                  required
                />
              </div>


              <div className="form-field">
                <label>
                  Industry
                </label>

                <select
                  value={form.industry}
                  onChange={(e) =>
                    updateField("industry", e.target.value)
                  }
                >
                  <option value="">
                    Select industry
                  </option>

                  <option value="COMPUTER_SOFTWARE">
                    Computer Software
                  </option>

                  <option value="COMPUTER_HARDWARE">
                    Computer Hardware
                  </option>

                  <option value="ELECTRICAL_ELECTRONIC_MANUFACTURING">
                    Electrical & Electronic Manufacturing
                  </option>

                  <option value="COMMERCIAL_REAL_ESTATE">
                    Commercial Real Estate
                  </option>

                  <option value="CONSTRUCTION">
                    Construction
                  </option>

                  <option value="EDUCATION_MANAGEMENT">
                    Education Management
                  </option>

                  <option value="FINANCIAL_SERVICES">
                    Financial Services
                  </option>

                  <option value="HEALTH_WELLNESS_AND_FITNESS">
                    Health, Wellness & Fitness
                  </option>

                  <option value="RETAIL">
                    Retail
                  </option>

                  <option value="SECURITY_AND_INVESTIGATIONS">
                    Security & Investigations
                  </option>

                  <option value="TELECOMMUNICATIONS">
                    Telecommunications
                  </option>

                  <option value="OTHER">
                    Other
                  </option>
                </select>
              </div>


              <div className="form-field">
                <label>
                  City
                </label>

                <input
                  type="text"
                  value={form.city}
                  onChange={(e) =>
                    updateField("city", e.target.value)
                  }
                  placeholder="Bengaluru"
                />
              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            SECTION 03 — PRODUCT
        =================================================== */}

        <section className="product-section">

          <div className="section-number">
            03
          </div>

          <div className="section-content">

            <div className="section-heading">
              <h2>Product Interest</h2>

              <p>
                Capture what the customer is interested in purchasing.
              </p>
            </div>


            <div className="form-grid">

              <div className="form-field">
                <label>
                  Product
                  <span>*</span>
                </label>

                <select
                  value={form.product}
                  onChange={(e) =>
                    updateField("product", e.target.value)
                  }
                  required
                >
                  <option value="">
                    Select a product
                  </option>

                  <option value="Smart Access Control">
                    Smart Access Control
                  </option>

                  <option value="Smart Locks">
                    Smart Locks
                  </option>

                  <option value="Smart Sensors">
                    Smart Sensors
                  </option>

                  <option value="CCTV & Surveillance">
                    CCTV & Surveillance
                  </option>

                  <option value="IoT Solutions">
                    IoT Solutions
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>


              <div className="form-field">
                <label>
                  Number of Devices
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.devices}
                  onChange={(e) =>
                    updateField("devices", e.target.value)
                  }
                  placeholder="250"
                />
              </div>


              <div className="form-field">
                <label>
                  Estimated Deal Value
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.dealValue}
                  onChange={(e) =>
                    updateField("dealValue", e.target.value)
                  }
                  placeholder="850000"
                />
              </div>


              <div className="form-field">
                <label>
                  Currency
                </label>

                <select
                  value={form.currency}
                  onChange={(e) =>
                    updateField("currency", e.target.value)
                  }
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            SECTION 04 — DEAL
        =================================================== */}

        <section className="product-section">

          <div className="section-number">
            04
          </div>

          <div className="section-content">

            <div className="section-heading">
              <h2>Deal Information</h2>

              <p>
                Sales and deal qualification information.
              </p>
            </div>


            <div className="form-grid">

              <div className="form-field">
                <label>
                  Deal Stage
                </label>

                <select
                  value={form.dealStage}
                  onChange={(e) =>
                    updateField("dealStage", e.target.value)
                  }
                >
                  <option value="appointmentscheduled">
                    Appointment Scheduled
                  </option>

                  <option value="qualifiedtobuy">
                    Qualified to Buy
                  </option>

                  <option value="presentationscheduled">
                    Presentation Scheduled
                  </option>

                  <option value="decisionmakerboughtin">
                    Decision Maker Bought In
                  </option>

                  <option value="contractsent">
                    Contract Sent
                  </option>

                  <option value="closedwon">
                    Closed Won
                  </option>

                  <option value="closedlost">
                    Closed Lost
                  </option>
                </select>
              </div>


              <div className="form-field">
                <label>
                  Lead Source
                </label>

                <select
                  value={form.leadSource}
                  onChange={(e) =>
                    updateField("leadSource", e.target.value)
                  }
                >
                  <option value="website">
                    Website
                  </option>

                  <option value="referral">
                    Referral
                  </option>

                  <option value="exhibition">
                    Exhibition
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>


              <div className="form-field">
                <label>
                  Lead Status
                </label>

                <select
                  value={form.leadStatus}
                  onChange={(e) =>
                    updateField("leadStatus", e.target.value)
                  }
                >
                  <option value="new">
                    New
                  </option>

                  <option value="open">
                    Open
                  </option>

                  <option value="in_progress">
                    In Progress
                  </option>

                  <option value="qualified">
                    Qualified
                  </option>

                  <option value="unqualified">
                    Unqualified
                  </option>
                </select>
              </div>


              <div className="form-field">
                <label>
                  Salesperson
                </label>

                <select
                  value={form.salesperson}
                  onChange={(e) =>
                    updateField("salesperson", e.target.value)
                  }
                >
                  <option value="">
                    Select salesperson
                  </option>

                  <option value="Amit Verma">
                    Amit Verma
                  </option>

                  <option value="Priya Sharma">
                    Priya Sharma
                  </option>

                  <option value="Rahul Mehta">
                    Rahul Mehta
                  </option>

                  <option value="Neha Singh">
                    Neha Singh
                  </option>
                </select>
              </div>


              <div className="form-field">
                <label>
                  Expected Close Date
                </label>

                <input
                  type="date"
                  value={form.closeDate}
                  onChange={(e) =>
                    updateField("closeDate", e.target.value)
                  }
                />
              </div>


              <div className="form-field form-field-wide">
                <label>
                  Notes
                </label>

                <textarea
                  value={form.notes}
                  onChange={(e) =>
                    updateField("notes", e.target.value)
                  }
                  placeholder="Add customer requirements, discussion notes, or additional information..."
                  rows="5"
                />
              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            ACTIONS
        =================================================== */}

        <div className="product-form-footer">

          <button
            type="button"
            className="form-cancel"
            onClick={onBack}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="form-submit"
            disabled={loading}
          >

            {loading ? (
              <>
                <Loader2
                  size={16}
                  className="submit-spinner"
                />

                Submitting...
              </>
            ) : (
              <>
                Submit Product Interest
                <span>→</span>
              </>
            )}

          </button>

        </div>

      </form>

    </div>
  );
}

export default ProductInterestForm;