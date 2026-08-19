import React, { useState } from "react";
import ProductInterestForm from "./ProductInterestForm";

const roles = ["Manager", "Sales", "Developer / Support", "Customer"];

// ==================================================
// SIDEBAR NAVIGATION
// ONLY DASHBOARD + LEADS
// ==================================================

const navGroups = [
  {
    label: "SALES",
    items: [
      ["Leads", "users"],
    ],
  },
];

// ==================================================
// ICONS
// ==================================================

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),

    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),

    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
        <path d="M10 12v2h4v-2" />
      </>
    ),

    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h17" />
        <path d="m7 15 4-5 3 2 5-7" />
      </>
    ),

    building: (
      <>
        <path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16" />
        <path d="M2 21h20" />
        <path d="M8 7h4" />
        <path d="M8 11h4" />
        <path d="M8 15h4" />
        <path d="M17 9h3v12" />
        <path d="M11 21v-3h3v3" />
      </>
    ),

    person: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),

    ticket: (
      <>
        <path d="M4 5h16v5a3 3 0 0 0 0 6v5H4v-5a3 3 0 0 0 0-6Z" />
        <path d="M12 5v2" />
        <path d="M12 17v2" />
        <path d="M12 11v2" />
      </>
    ),

    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22Z" />
        <path d="M4 5.5V22" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
      </>
    ),

    code: (
      <>
        <path d="m8 9-4 3 4 3" />
        <path d="m16 9 4 3-4 3" />
        <path d="m14 5-4 14" />
      </>
    ),

    folder: (
      <path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    analytics: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h17" />
        <rect x="7" y="12" width="3" height="4" />
        <rect x="12" y="9" width="3" height="7" />
        <rect x="17" y="6" width="3" height="10" />
      </>
    ),

    team: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3 20a6 6 0 0 1 12 0" />
        <path d="M14 20a5 5 0 0 1 7 0" />
        <path d="M4 14a4 4 0 0 1 3-1.7" />
      </>
    ),

    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.42 1.42-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2v-.08A1.7 1.7 0 0 0 12.38 18.4a1.7 1.7 0 0 0-1.88.34l-.06.06-1.42-1.42.06-.06A1.7 1.7 0 0 0 9.42 15a1.7 1.7 0 0 0-1.56-1.03H7.8v-2h.06A1.7 1.7 0 0 0 9.42 11a1.7 1.7 0 0 0-.34-1.88l-.06-.06 1.42-1.42.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 13.4 6.5V6h2v.5a1.7 1.7 0 0 0 1.03 1.54 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.42 1.42-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03H21v2h-.05A1.7 1.7 0 0 0 19.4 15Z" />
      </>
    ),

    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),

    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),

    chevron: <path d="m7 10 5 5 5-5" />,

    switch: (
      <>
        <path d="M17 3l4 4-4 4" />
        <path d="M3 7h18" />
        <path d="M7 21l-4-4 4-4" />
        <path d="M21 17H3" />
      </>
    ),

    calendar: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || paths.dashboard}</svg>;
}

// ==================================================
// MANAGER DATA
// ==================================================

const stats = [
  {
    icon: "₹",
    label: "Total Revenue",
    value: "₹4.25M",
    change: "18.6%",
    up: true,
    tone: "purple",
  },
  {
    icon: "▥",
    label: "Total Pipeline",
    value: "₹12.40M",
    change: "22.4%",
    up: true,
    tone: "blue",
  },
  {
    icon: "★",
    label: "Won Deals",
    value: "32",
    change: "14.3%",
    up: true,
    tone: "green",
  },
  {
    icon: "◉",
    label: "Open Tickets",
    value: "78",
    change: "10%",
    up: false,
    tone: "orange",
  },
  {
    icon: "!",
    label: "High Priority Tickets",
    value: "23",
    change: "8%",
    up: false,
    tone: "red",
  },
  {
    icon: "</>",
    label: "Open Jira Issues",
    value: "54",
    change: "12%",
    up: false,
    tone: "violet",
  },
];

const salespeople = [
  ["Amit Verma", "Closed Deals: 12", "₹1.85M"],
  ["Neha Singh", "Closed Deals: 8", "₹1.25M"],
  ["Rahul Das", "Closed Deals: 6", "₹850K"],
];

const deals = [
  [
    "ABC Tech Parks Pvt. Ltd.",
    "Smart Access Control",
    "₹850,000",
    "Proposal",
  ],
  ["XYZ Logistics", "Smart Access Control", "₹620,000", "Negotiation"],
  ["GreenView Buildings", "Smart Access Control", "₹450,000", "Qualified"],
  ["Sunrise Enterprises", "Smart Access Control", "₹320,000", "New"],
];

const tickets = [
  [
    "#FD-1256",
    "Door lock not responding",
    "ABC Tech Parks",
    "High",
    "2h ago",
  ],
  [
    "#FD-1240",
    "Device offline issue",
    "GreenView Buildings",
    "High",
    "4h ago",
  ],
  [
    "#FD-1233",
    "Access denied for valid card",
    "XYZ Logistics",
    "High",
    "6h ago",
  ],
];

const jira = [
  ["BJS-3321", "API integration failure", "In Progress"],
  ["BJS-3310", "Mobile app crash on login", "In Progress"],
  ["BJS-3298", "Performance issue in sync", "To Do"],
  ["BJS-3286", "UI rendering issue", "To Do"],
];

// ==================================================
// LINE CHART
// ==================================================

function MiniLineChart() {
  return (
    <svg
      className="line-chart"
      viewBox="0 0 620 220"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#5b45df" stopOpacity=".20" />
          <stop offset="100%" stopColor="#5b45df" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[35, 80, 125, 170].map((y) => (
        <line
          key={y}
          x1="40"
          x2="600"
          y1={y}
          y2={y}
          className="grid-line"
        />
      ))}

      <path
        d="M40 168 L120 132 L200 144 L280 96 L360 120 L440 66 L520 40 L600 20 L600 190 L40 190Z"
        fill="url(#area)"
      />

      <path
        d="M40 168 L120 132 L200 144 L280 96 L360 120 L440 66 L520 40 L600 20"
        fill="none"
        stroke="#5b45df"
        strokeWidth="4"
      />

      {[
        ["40", "168"],
        ["120", "132"],
        ["200", "144"],
        ["280", "96"],
        ["360", "120"],
        ["440", "66"],
        ["520", "40"],
        ["600", "20"],
      ].map(([cx, cy]) => (
        <circle
          key={cx}
          cx={cx}
          cy={cy}
          r="5"
          fill="#5b45df"
          stroke="#fff"
          strokeWidth="3"
        />
      ))}

      {[
        "May 20",
        "May 21",
        "May 22",
        "May 23",
        "May 24",
        "May 25",
        "May 26",
      ].map((x, i) => (
        <text
          key={x}
          x={55 + i * 88}
          y="214"
          className="axis-label"
        >
          {x}
        </text>
      ))}
    </svg>
  );
}

// ==================================================
// DONUT CHART
// ==================================================

function Donut({ values = [30, 25, 20, 15, 10] }) {
  const total = values.reduce((a, b) => a + b, 0);
  let offset = 0;

  const colors = [
    "#5b45df",
    "#3778e8",
    "#25b5c5",
    "#f59b21",
    "#4caf68",
  ];

  return (
    <svg className="donut" viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r="43"
        fill="none"
        stroke="#eef0f5"
        strokeWidth="20"
      />

      {values.map((v, i) => {
        const dash = `${(v / total) * 270.2} 270.2`;
        const rotation = -90 + (offset / total) * 360;

        offset += v;

        return (
          <circle
            key={i}
            cx="60"
            cy="60"
            r="43"
            fill="none"
            stroke={colors[i]}
            strokeWidth="20"
            strokeDasharray={dash}
            transform={`rotate(${rotation} 60 60)`}
          />
        );
      })}

      <circle cx="60" cy="60" r="29" fill="#fff" />
    </svg>
  );
}

// ==================================================
// BAR CHART
// ==================================================

function BarChart() {
  const bars = [
    ["Sales", 85, "#6249d8"],
    ["Support", 62, "#3778e8"],
    ["Engineering", 54, "#2db4c4"],
    ["Others", 28, "#f39a1f"],
  ];

  return (
    <div className="bar-chart">
      <div className="bar-axis">
        <span>100</span>
        <span>75</span>
        <span>50</span>
        <span>25</span>
        <span>0</span>
      </div>

      <div className="bars">
        {bars.map(([label, value, color]) => (
          <div className="bar-wrap" key={label}>
            <span className="bar-value">{value}</span>

            <div
              className="bar"
              style={{
                height: `${value}%`,
                background: color,
              }}
            />

            <span className="bar-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================================================
// SALES DASHBOARD
// ==================================================

function SalesDashboard() {
  const leads = [
    [
      "Rajesh Mehta",
      "ABC Tech Parks Pvt. Ltd.",
      "Smart Access Control",
    ],
    ["Sneha Patel", "GreenView Buildings", "Cloud Access"],
    ["Vikram Kumar", "XYZ Logistics", "Smart Locks"],
    ["Anita Nair", "Sunrise Enterprises", "Visitor Management"],
  ];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Sales Dashboard</h1>
          <p>Track leads, deals and sales performance.</p>
        </div>

        <button className="date-btn">
          <Icon name="calendar" size={17} />
          May 20 – May 26, 2024
          <Icon name="chevron" size={15} />
        </button>
      </div>

      <div className="stats-grid role-stats">
        {[
          ["users", "Total Leads", "64", "12%", "purple"],
          ["users", "Qualified Leads", "28", "8%", "blue"],
          ["briefcase", "Active Deals", "18", "15%", "green"],
          ["chart", "Pipeline Value", "₹6.25M", "20%", "orange"],
          ["dashboard", "Won Deals", "12", "10%", "violet"],
          ["clock", "Follow-ups Due", "9", "6%", "red"],
        ].map(([icon, label, value, change, tone]) => (
          <div className="stat-card" key={label}>
            <div className={`stat-icon ${tone}`}>
              <Icon name={icon} size={20} />
            </div>

            <div className="stat-info">
              <span>{label}</span>
              <strong>{value}</strong>
              <small className="positive">↑ {change}</small>
              <em>vs last 7 days</em>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <section className="panel revenue">
          <div className="panel-head">
            <h2>Revenue Trend</h2>
            <button>
              This Week
              <Icon name="chevron" size={14} />
            </button>
          </div>

          <MiniLineChart />
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>Lead Sources</h2>
          </div>

          <div className="donut-layout">
            <Donut />

            <div className="legend">
              {[
                ["Website", "40%", "#5b45df"],
                ["Referral", "25%", "#3778e8"],
                ["Exhibition", "15%", "#25b5c5"],
                ["Cold Call", "10%", "#4caf68"],
                ["Others", "10%", "#f59b21"],
              ].map(([label, val, color]) => (
                <div key={label}>
                  <span style={{ background: color }} />
                  {label}
                  <b>{val}</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>Sales Pipeline</h2>
          </div>

          <BarChart />
        </section>
      </div>

      <div className="lists-grid role-lists">
        <section className="panel list-panel">
          <div className="panel-head">
            <h2>Recent Leads</h2>
          </div>

          {leads.map(([name, company, product], i) => (
            <div className="person-row" key={name}>
              <div className={`mini-avatar a${i}`}>
                {name
                  .split(" ")
                  .map((x) => x[0])
                  .join("")}
              </div>

              <div className="person-copy">
                <strong>{name}</strong>
                <span>{company}</span>
                <span>{product}</span>
              </div>

              <span className="badge new">New</span>
            </div>
          ))}

          <button className="view-link">
            View all leads
            <Icon name="arrow" size={16} />
          </button>
        </section>

        <section className="panel list-panel">
          <div className="panel-head">
            <h2>Recent Deals</h2>
          </div>

          {deals.map(([company, product, value, status]) => (
            <div className="deal-row" key={company}>
              <div>
                <strong>{company}</strong>
                <span>{product}</span>
              </div>

              <b>{value}</b>

              <span
                className={`badge ${status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {status}
              </span>
            </div>
          ))}

          <button className="view-link">
            View all deals
            <Icon name="arrow" size={16} />
          </button>
        </section>

        <section className="panel list-panel">
          <div className="panel-head">
            <h2>My Follow-ups</h2>
          </div>

          {[
            ["ABC Tech Parks", "Proposal follow-up", "Today"],
            ["GreenView Buildings", "Product demo", "Tomorrow"],
            ["XYZ Logistics", "Negotiation call", "Aug 15"],
            ["Sunrise Enterprises", "Pricing discussion", "Aug 16"],
          ].map(([company, task, time]) => (
            <div className="jira-row" key={company}>
              <div>
                <strong>{company}</strong>
                <span>{task}</span>
              </div>

              <span className="badge proposal">{time}</span>
            </div>
          ))}
        </section>

        <section className="panel list-panel">
          <div className="panel-head">
            <h2>Top Performance</h2>
          </div>

          {salespeople.map(([name, sub, value], i) => (
            <div className="person-row" key={name}>
              <div className={`mini-avatar a${i}`}>
                {name
                  .split(" ")
                  .map((x) => x[0])
                  .join("")}
              </div>

              <div className="person-copy">
                <strong>{name}</strong>
                <span>{sub}</span>
              </div>

              <b>{value}</b>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

// ==================================================
// DEVELOPER / SUPPORT DASHBOARD
// ==================================================

function DeveloperDashboard() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Developer / Support Dashboard</h1>
          <p>Manage support tickets and engineering escalations.</p>
        </div>
      </div>

      <div className="stats-grid role-stats">
        {[
          ["ticket", "Open Tickets", "78", "10%", "orange"],
          ["ticket", "High Priority", "23", "8%", "red"],
          ["code", "My Jira Issues", "12", "5%", "violet"],
          ["code", "Escalated Issues", "14", "8%", "blue"],
          ["clock", "Avg Resolution", "18.6 hrs", "8%", "purple"],
          ["dashboard", "SLA Compliance", "93%", "5%", "green"],
        ].map(([icon, label, value, change, tone]) => (
          <div className="stat-card" key={label}>
            <div className={`stat-icon ${tone}`}>
              <Icon name={icon} size={20} />
            </div>

            <div className="stat-info">
              <span>{label}</span>
              <strong>{value}</strong>
              <small className="positive">↑ {change}</small>
              <em>vs last 7 days</em>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <section className="panel revenue">
          <div className="panel-head">
            <h2>Ticket Volume</h2>

            <button>
              This Week
              <Icon name="chevron" size={14} />
            </button>
          </div>

          <MiniLineChart />
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>Ticket Status</h2>
          </div>

          <div className="donut-layout">
            <Donut values={[42, 28, 18, 12]} />

            <div className="legend">
              {[
                ["Open", "42%", "#e8880d"],
                ["In Progress", "28%", "#3778e8"],
                ["Resolved", "18%", "#4caf68"],
                ["Escalated", "12%", "#e6474f"],
              ].map(([a, b, c]) => (
                <div key={a}>
                  <span style={{ background: c }} />
                  {a}
                  <b>{b}</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2>Issues by Team</h2>
          </div>

          <BarChart />
        </section>
      </div>

      <div className="lists-grid role-lists">
        <section className="panel list-panel">
          <div className="panel-head">
            <h2>High Priority Tickets</h2>
          </div>

          {tickets.map(([id, title, company, priority, time], i) => (
            <div className="ticket-row" key={id}>
              <div className={`mini-avatar a${i}`}>
                {["AM", "NS", "RD"][i]}
              </div>

              <div className="ticket-copy">
                <strong>
                  {id}
                  <span className="badge high">{priority}</span>
                </strong>

                <span>{title}</span>
                <small>{company}</small>
              </div>

              <time>{time}</time>
            </div>
          ))}

          <button className="view-link">
            View all tickets
            <Icon name="arrow" size={16} />
          </button>
        </section>

        <section className="panel list-panel">
          <div className="panel-head">
            <h2>Engineering Issues (Jira)</h2>
          </div>

          {jira.map(([id, title, status]) => (
            <div className="jira-row" key={id}>
              <div>
                <strong>{id}</strong>
                <span>{title}</span>
              </div>

              <span
                className={`badge ${
                  status === "In Progress" ? "progress" : "todo"
                }`}
              >
                {status}
              </span>
            </div>
          ))}

          <button className="view-link">
            View all issues
            <Icon name="arrow" size={16} />
          </button>
        </section>

        <section className="panel list-panel">
          <div className="panel-head">
            <h2>Recent Escalations</h2>
          </div>

          {[
            ["#FD-1256", "Door lock not responding", "Jira created"],
            ["#FD-1240", "Device offline issue", "Engineering review"],
            ["#FD-1233", "Access denied for valid card", "Jira created"],
            ["#FD-1228", "Reader configuration issue", "Assigned"],
          ].map(([id, title, status]) => (
            <div className="jira-row" key={id}>
              <div>
                <strong>{id}</strong>
                <span>{title}</span>
              </div>

              <span className="badge progress">{status}</span>
            </div>
          ))}
        </section>

        <section className="panel list-panel">
          <div className="panel-head">
            <h2>Performance</h2>
          </div>

          {[
            ["First Response", "4.2 hrs"],
            ["Avg Resolution", "18.6 hrs"],
            ["Tickets Resolved", "62"],
            ["SLA Compliance", "93%"],
          ].map(([a, b]) => (
            <div className="person-row" key={a}>
              <div className="perf-icon">✓</div>

              <div className="person-copy">
                <strong>{a}</strong>
                <span>This week</span>
              </div>

              <b>{b}</b>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

// ==================================================
// CUSTOMER DASHBOARD
// ==================================================

function CustomerDashboard() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Customer Dashboard</h1>
          <p>
            Manage your products, support requests and account activity.
          </p>
        </div>
      </div>

      <div className="stats-grid role-stats">
        {[
          [
            "building",
            "My Company",
            "ABC Tech Parks",
            "Customer since 2024",
            "purple",
          ],
          [
            "folder",
            "My Products",
            "5",
            "Active products",
            "blue",
          ],
          [
            "ticket",
            "Open Tickets",
            "3",
            "Currently active",
            "orange",
          ],
          [
            "dashboard",
            "Resolved Tickets",
            "8",
            "Successfully resolved",
            "green",
          ],
          [
            "clock",
            "Support Response",
            "4.2 hrs",
            "Average response",
            "violet",
          ],
          [
            "person",
            "Account Manager",
            "Priya Sharma",
            "Your Backjobs contact",
            "red",
          ],
        ].map(([icon, label, value, sub, tone]) => (
          <div className="stat-card" key={label}>
            <div className={`stat-icon ${tone}`}>
              <Icon name={icon} size={20} />
            </div>

            <div className="stat-info">
              <span>{label}</span>
              <strong>{value}</strong>
              <em>{sub}</em>
            </div>
          </div>
        ))}
      </div>

      <div className="lists-grid role-lists">
        <section className="panel list-panel">
          <div className="panel-head">
            <h2>My Support Tickets</h2>
          </div>

          {[
            ["#FD-1256", "Door lock not responding", "In Progress"],
            ["#FD-1240", "Device offline issue", "Waiting"],
            ["#FD-1233", "Access denied for valid card", "Resolved"],
            ["#FD-1228", "Reader configuration issue", "Resolved"],
          ].map(([id, title, status]) => (
            <div className="jira-row" key={id}>
              <div>
                <strong>{id}</strong>
                <span>{title}</span>
              </div>

              <span
                className={`badge ${
                  status === "Resolved" ? "qualified" : "progress"
                }`}
              >
                {status}
              </span>
            </div>
          ))}

          <button className="view-link">
            View all tickets
            <Icon name="arrow" size={16} />
          </button>
        </section>

        <section className="panel list-panel">
          <div className="panel-head">
            <h2>My Products</h2>
          </div>

          {[
            ["Smart Access Control", "25 Devices"],
            ["Cloud Access", "12 Devices"],
            ["Visitor Management", "8 Devices"],
            ["Mobile Access", "5 Devices"],
          ].map(([name, count]) => (
            <div className="jira-row" key={name}>
              <div>
                <strong>{name}</strong>
                <span>{count}</span>
              </div>

              <span className="badge qualified">Active</span>
            </div>
          ))}
        </section>

        <section className="panel list-panel">
          <div className="panel-head">
            <h2>Quick Actions</h2>
          </div>

          <button className="quick-action purple-action">
            ＋ Create Support Ticket
          </button>

          <button className="quick-action blue-action">
            💬 Chat with Support Assistant
          </button>

          <button className="quick-action green-action">
            📖 Open Knowledge Base
          </button>

          <button className="quick-action orange-action">
            ◉ Contact Account Manager
          </button>
        </section>

        <section className="panel list-panel">
          <div className="panel-head">
            <h2>Account Information</h2>
          </div>

          {[
            ["Company", "ABC Tech Parks Pvt. Ltd."],
            ["Plan", "Enterprise"],
            ["Devices", "50 active"],
            ["Account Status", "Active"],
          ].map(([a, b]) => (
            <div className="person-row" key={a}>
              <div className="person-copy">
                <strong>{a}</strong>
                <span>{b}</span>
              </div>

              <span className="badge qualified">
                {a === "Account Status" ? "Active" : "View"}
              </span>
            </div>
          ))}
        </section>
      </div>

      <section className="panel performance">
        <div className="panel-head">
          <h2>Support Assistant</h2>
        </div>

        <div className="chat-box">
          <div className="chat-message">
            Hi! I'm your Backjobs Support Assistant. How can I help you
            today?
          </div>

          <div className="chat-options">
            <button>How do I reset my device?</button>
            <button>My device is offline</button>
            <button>Help with installation</button>
            <button>Other questions</button>
          </div>

          <input
            className="chat-input"
            placeholder="Type your message..."
          />
        </div>
      </section>
    </>
  );
}

// ==================================================
// MAIN APP
// ==================================================

function App() {
  const [role, setRole] = useState("Manager");
  const [switchOpen, setSwitchOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="app">
      {/* ==============================================
          SIDEBAR
          ============================================== */}

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">B</div>

          <div>
            <div className="brand-name">BACKJOBS</div>
            <div className="brand-tag">
              ACCESS. CONTROL. SIMPLIFIED.
            </div>
          </div>
        </div>

        <nav>
          {/* DASHBOARD */}

          <button
            className={`nav-item ${
              active === "Dashboard" ? "active" : ""
            }`}
            onClick={() => setActive("Dashboard")}
          >
            <Icon name="dashboard" size={19} />
            Dashboard
          </button>

          {/* LEADS ONLY */}

          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <div className="group-title">{group.label}</div>

              {group.items.map(([label, icon]) => (
                <button
                  key={label}
                  className={`nav-item ${
                    active === label ? "active" : ""
                  }`}
                  onClick={() => setActive(label)}
                >
                  <Icon name={icon} size={19} />
                  {label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="current-role">
          <div className="role-icon">
            <Icon name="person" size={20} />
          </div>

          <div>
            <div className="role-caption">CURRENT ROLE</div>

            <strong>{role.toUpperCase()}</strong>

            <div className="role-status">
              <span />
              You have full access to all modules.
            </div>
          </div>
        </div>
      </aside>

      {/* ==============================================
          MAIN CONTENT
          ============================================== */}

      <main className="main">
        {/* TOP BAR */}

        <header className="topbar">
          <button className="hamburger">
            <span />
            <span />
            <span />
          </button>

          <div className="search">
            <Icon name="search" size={20} />
            <input placeholder="Search anything..." />
          </div>

          <div className="top-actions">
            {/* ROLE SWITCHER */}

            <div className="switch-wrap">
              <button
                className="switch-btn"
                onClick={() => setSwitchOpen((v) => !v)}
              >
                <Icon name="switch" size={18} />
                Switch Role
                <Icon name="chevron" size={16} />
              </button>

              {switchOpen && (
                <div className="role-menu">
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setSwitchOpen(false);
                      }}
                    >
                      <span
                        className={`role-dot ${
                          r === role ? "selected" : ""
                        }`}
                      />

                      {r}

                      {r === role && (
                        <span className="check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* NOTIFICATIONS */}

            <button className="icon-btn notification">
              <Icon name="bell" size={21} />
              <span>6</span>
            </button>

            {/* PROFILE */}

            <div className="profile">
              <div className="avatar">PS</div>

              <div>
                <strong>Priya Sharma</strong>
                <small>{role}</small>
              </div>

              <Icon name="chevron" size={16} />
            </div>
          </div>
        </header>

        {/* ==============================================
            CONTENT
            ============================================== */}

        <section className="content">
          {/* LEADS PAGE */}

          {active === "Leads" ? (
            <ProductInterestForm
              onBack={() => setActive("Dashboard")}
            />
          ) : (
            <>
              {/* MANAGER */}

              {role === "Manager" && (
                <>
                  <div className="page-head">
                    <div>
                      <h1>Manager Dashboard</h1>
                      <p>
                        Overview of all departments and overall
                        performance.
                      </p>
                    </div>

                    <button className="date-btn">
                      <Icon name="calendar" size={17} />
                      May 20 – May 26, 2024
                      <Icon name="chevron" size={15} />
                    </button>
                  </div>

                  {/* STATS */}

                  <div className="stats-grid">
                    {stats.map((s) => (
                      <div className="stat-card" key={s.label}>
                        <div className={`stat-icon ${s.tone}`}>
                          {s.icon}
                        </div>

                        <div className="stat-info">
                          <span>{s.label}</span>

                          <strong>{s.value}</strong>

                          <small
                            className={
                              s.up ? "positive" : "negative"
                            }
                          >
                            {s.up ? "↑" : "↓"} {s.change}
                          </small>

                          <em>vs last 7 days</em>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CHARTS */}

                  <div className="charts-grid">
                    <section className="panel revenue">
                      <div className="panel-head">
                        <h2>Revenue Trend</h2>

                        <button>
                          This Week
                          <Icon name="chevron" size={14} />
                        </button>
                      </div>

                      <MiniLineChart />
                    </section>

                    <section className="panel">
                      <div className="panel-head">
                        <h2>Pipeline Distribution</h2>
                      </div>

                      <div className="donut-layout">
                        <Donut />

                        <div className="legend">
                          {[
                            ["New Leads", "30%", "#5b45df"],
                            ["Qualified", "25%", "#3778e8"],
                            ["Proposal", "20%", "#25b5c5"],
                            ["Negotiation", "15%", "#f59b21"],
                            ["Won", "10%", "#4caf68"],
                          ].map(([label, val, color]) => (
                            <div key={label}>
                              <span
                                style={{
                                  background: color,
                                }}
                              />

                              {label}

                              <b>{val}</b>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="panel-foot">
                        Total Pipeline Value: <b>₹12.40M</b>
                      </div>
                    </section>

                    <section className="panel">
                      <div className="panel-head">
                        <h2>Department Overview</h2>

                        <button>
                          This Week
                          <Icon name="chevron" size={14} />
                        </button>
                      </div>

                      <BarChart />
                    </section>
                  </div>

                  {/* MANAGER LISTS */}

                  <div className="lists-grid">
                    {/* SALESPEOPLE */}

                    <section className="panel list-panel">
                      <div className="panel-head">
                        <h2>Top Performing Salespeople</h2>
                      </div>

                      {salespeople.map(
                        ([name, sub, value], i) => (
                          <div
                            className="person-row"
                            key={name}
                          >
                            <div className={`mini-avatar a${i}`}>
                              {name
                                .split(" ")
                                .map((x) => x[0])
                                .join("")}
                            </div>

                            <div className="person-copy">
                              <strong>{name}</strong>
                              <span>{sub}</span>
                            </div>

                            <b>{value}</b>
                          </div>
                        )
                      )}

                      <button className="view-link">
                        View all sales performance
                        <Icon name="arrow" size={16} />
                      </button>
                    </section>

                    {/* DEALS */}

                    <section className="panel list-panel">
                      <div className="panel-head">
                        <h2>Recent Deals</h2>
                      </div>

                      {deals.map(
                        ([company, product, value, status]) => (
                          <div
                            className="deal-row"
                            key={company}
                          >
                            <div>
                              <strong>{company}</strong>
                              <span>{product}</span>
                            </div>

                            <b>{value}</b>

                            <span
                              className={`badge ${status
                                .toLowerCase()
                                .replace(" ", "-")}`}
                            >
                              {status}
                            </span>
                          </div>
                        )
                      )}

                      <button className="view-link">
                        View all deals
                        <Icon name="arrow" size={16} />
                      </button>
                    </section>

                    {/* TICKETS */}

                    <section className="panel list-panel">
                      <div className="panel-head">
                        <h2>High Priority Tickets</h2>
                      </div>

                      {tickets.map(
                        (
                          [id, title, company, priority, time],
                          i
                        ) => (
                          <div
                            className="ticket-row"
                            key={id}
                          >
                            <div className={`mini-avatar a${i}`}>
                              {i === 0
                                ? "AM"
                                : i === 1
                                ? "NS"
                                : "RD"}
                            </div>

                            <div className="ticket-copy">
                              <strong>
                                {id}{" "}
                                <span className="badge high">
                                  {priority}
                                </span>
                              </strong>

                              <span>{title}</span>
                              <small>{company}</small>
                            </div>

                            <time>{time}</time>
                          </div>
                        )
                      )}

                      <button className="view-link">
                        View all tickets
                        <Icon name="arrow" size={16} />
                      </button>
                    </section>

                    {/* JIRA */}

                    <section className="panel list-panel">
                      <div className="panel-head">
                        <h2>Engineering Issues (Jira)</h2>
                      </div>

                      {jira.map(([id, title, status]) => (
                        <div
                          className="jira-row"
                          key={id}
                        >
                          <div>
                            <strong>{id}</strong>
                            <span>{title}</span>
                          </div>

                          <span
                            className={`badge ${
                              status === "In Progress"
                                ? "progress"
                                : "todo"
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      ))}

                      <button className="view-link">
                        View all issues
                        <Icon name="arrow" size={16} />
                      </button>
                    </section>
                  </div>

                  {/* PERFORMANCE */}

                  <section className="panel performance">
                    <div className="panel-head">
                      <h2>
                        Resolution & Performance Overview
                      </h2>
                    </div>

                    <div className="performance-grid">
                      {[
                        [
                          "◷",
                          "Average Ticket",
                          "Resolution Time",
                          "18.6 hrs",
                          "↓ 8%",
                          "good",
                        ],
                        [
                          "◌",
                          "First Response Time",
                          "",
                          "4.2 hrs",
                          "↓ 6%",
                          "good",
                        ],
                        [
                          "✓",
                          "Tickets Resolved",
                          "This Week",
                          "62",
                          "↑ 15%",
                          "good",
                        ],
                        [
                          "♢",
                          "SLA Compliance",
                          "",
                          "93%",
                          "↑ 5%",
                          "good",
                        ],
                        [
                          "☆",
                          "Customer Satisfaction",
                          "",
                          "4.6/5",
                          "↑ 0.3",
                          "good",
                        ],
                      ].map(
                        ([
                          icon,
                          title,
                          sub,
                          value,
                          change,
                          tone,
                        ]) => (
                          <div
                            className="perf-item"
                            key={title}
                          >
                            <div className="perf-icon">
                              {icon}
                            </div>

                            <div>
                              <span>{title}</span>

                              {sub && <small>{sub}</small>}

                              <strong>{value}</strong>

                              <em className={tone}>
                                {change}
                              </em>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </section>
                </>
              )}

              {/* SALES */}

              {role === "Sales" && <SalesDashboard />}

              {/* DEVELOPER */}

              {role === "Developer / Support" && (
                <DeveloperDashboard />
              )}

              {/* CUSTOMER */}

              {role === "Customer" && <CustomerDashboard />}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;