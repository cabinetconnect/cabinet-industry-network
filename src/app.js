const { useEffect, useMemo, useState } = React;
const e = React.createElement;

const CIN_BRAND = {
  name: "Cabinet Industry Network",
  tagline: "Connecting Australia's Cabinetmaking Industry",
  email: "hello@cabinetindustrynetwork.com.au",
  logoHeader: "assets/cin-logo-header.png",
  logoFooter: "assets/cin-logo-footer.png",
};

const FORM_INTEGRATION_TARGETS = "Google Sheets, Airtable, Tally, Formspree or Supabase";

const states = [
  "Australian Capital Territory",
  "New South Wales",
  "Northern Territory",
  "Queensland",
  "South Australia",
  "Tasmania",
  "Victoria",
  "Western Australia",
];

const roles = [
  "Business Owner",
  "Installer",
  "Cabinet Maker",
  "CNC Operator",
  "Draftsperson/Detailer",
  "Apprentice",
  "Subcontractor",
  "Supplier",
  "Other",
];

const interests = [
  "Hiring",
  "Finding Work",
  "Contract Work",
  "Apprenticeships",
  "Industry Updates",
  "Advertising/Sponsorship",
];

const audience = [
  "Installers",
  "Cabinet Makers",
  "CNC Operators",
  "Draftspersons & Detailers",
  "Apprentices",
  "Subcontractors",
  "Suppliers & Industry Partners",
  "Cabinet Businesses",
];

const audienceCards = [
  ["building-2", "Cabinet Businesses", "Find staff, contractors, installers and industry connections."],
  ["drill", "Installers", "Show availability and connect with businesses needing site support."],
  ["hammer", "Cabinet Makers", "Discover roles, contract work and trade-specific opportunities."],
  ["settings-2", "CNC Operators", "Connect with businesses looking for machine and factory capability."],
  ["ruler", "Draftspersons & Detailers", "Be found for detailing, drafting and technical project support."],
  ["graduation-cap", "Apprentices", "Hear about apprenticeship pathways and entry-level opportunities."],
  ["handshake", "Subcontractors", "Build direct connections for overflow, install and project work."],
  ["package-check", "Suppliers & Industry Partners", "Stay visible to the businesses and professionals in the trade."],
];

const trustHighlights = [
  ["shield-check", "Built for cabinet and joinery trades"],
  ["map-pin", "Australia-wide network"],
  ["mail-check", "No spam, industry updates only"],
];

const earlyBenefits = [
  [
    "badge-check",
    "Be among the first businesses and professionals on the platform",
    "Early members help establish the first trusted network of cabinet and joinery operators, trades and employers.",
  ],
  [
    "briefcase-business",
    "Early access to job opportunities",
    "Hear about relevant roles and openings as the industry job board takes shape.",
  ],
  [
    "handshake",
    "Early access to contractor connections",
    "Be ready to connect with installers, cabinetmakers, subcontractors and overflow support.",
  ],
  [
    "message-square-heart",
    "Help shape the future of the platform",
    "Your early signup helps guide which locations, roles and business needs are prioritised first.",
  ],
  [
    "bell-ring",
    "Receive launch updates",
    "Get practical updates when new features, directories and early access opportunities are ready.",
  ],
];

const comingSoon = [
  ["Industry Job Board", "Purpose-built opportunities for cabinet industry roles."],
  ["Contractor & Installer Directory", "A searchable network of skilled trade professionals."],
  ["Apprenticeship Opportunities", "A clearer path for new talent entering the trade."],
  ["Business Directory", "A central place for cabinet and joinery businesses to be discovered."],
  ["Industry News & Updates", "Relevant updates from across Australia's cabinet and joinery industry."],
  ["Overflow Manufacturing Connections", "Connect overflow work with capable manufacturers."],
];

function Icon({ name, className = "h-5 w-5" }) {
  return e("i", { "data-lucide": name, className, "aria-hidden": "true" });
}

function ActionButton({ children, icon, variant = "primary", onClick }) {
  const variants = {
    primary:
      "bg-[#c4933d] text-white hover:bg-[#a8792f] focus-visible:outline-[#f8f7f4]",
    secondary:
      "bg-white text-neutral-950 hover:bg-[#f8f7f4] focus-visible:outline-[#c4933d]",
    ghost:
      "border border-white/45 bg-white/10 text-white hover:bg-white/18 focus-visible:outline-[#f8f7f4]",
  };

  return e(
    "button",
    {
      type: "button",
      onClick,
      className: [
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3",
        "text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "button-shadow",
        variants[variant],
      ].join(" "),
    },
    e(Icon, { name: icon, className: "h-4 w-4 shrink-0" }),
    e("span", null, children),
  );
}

function SectionHeader({ eyebrow, title, children, invert = false }) {
  return e(
    "div",
    { className: "mx-auto max-w-3xl text-center" },
    e(
      "p",
      {
        className: [
          "mb-3 text-sm font-semibold uppercase",
          invert ? "text-[#e2bd74]" : "text-[#a8792f]",
        ].join(" "),
      },
      eyebrow,
    ),
    e(
      "h2",
      {
        className: [
          "text-3xl font-bold leading-tight md:text-4xl",
          invert ? "text-white" : "text-neutral-950",
        ].join(" "),
      },
      title,
    ),
    children &&
      e(
        "p",
        {
          className: [
            "mt-4 text-base leading-7 md:text-lg",
            invert ? "text-neutral-300" : "text-neutral-600",
          ].join(" "),
        },
        children,
      ),
  );
}

function Hero({ onSelectInterest }) {
  const handleHeroClick = (interest = "") => {
    onSelectInterest(interest);
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return e(
    "section",
    { className: "relative min-h-[78svh] overflow-hidden bg-[#111a1f] text-white" },
    e("img", {
      src: "assets/cabinet-workshop-hero.png",
      alt: "",
      className: "hero-image absolute inset-0 h-full w-full object-cover",
      loading: "eager",
    }),
    e("div", {
      className:
        "absolute inset-0 bg-gradient-to-r from-[#111a1f] via-[#111a1f]/75 to-[#111a1f]/10",
    }),
    e("div", { className: "absolute inset-0 bg-[#111a1f]/20" }),
    e(
      "div",
      { className: "relative mx-auto flex min-h-[78svh] max-w-7xl flex-col px-5 py-5 md:px-8" },
      e(
        "nav",
        { className: "flex items-center justify-between gap-4" },
        e(
          "a",
          { href: "#top", className: "inline-flex items-center text-white" },
          e("img", {
            src: CIN_BRAND.logoHeader,
            alt: CIN_BRAND.name,
            className: "h-11 w-auto object-contain sm:h-12 md:h-14",
          }),
        ),
        e(
          "a",
          {
            href: `mailto:${CIN_BRAND.email}`,
            className:
              "rounded-lg border border-white/35 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
          },
          "Contact",
        ),
      ),
      e(
        "div",
        { className: "flex flex-1 items-center py-16 md:py-20" },
        e(
          "div",
          { className: "max-w-3xl" },
          e(
            "p",
            { className: "mb-4 text-sm font-semibold uppercase text-[#e2bd74]" },
            "Launching soon",
          ),
          e(
            "h1",
            { className: "text-5xl font-black leading-none text-white md:text-7xl" },
            CIN_BRAND.name,
          ),
          e(
            "p",
            { className: "mt-6 max-w-2xl text-xl font-semibold leading-8 text-[#f8f7f4] md:text-2xl" },
            "Connecting cabinetmakers, installers, contractors, apprentices and employers across Australia.",
          ),
          e(
            "p",
            { className: "mt-5 max-w-2xl text-base leading-7 text-neutral-200 md:text-lg" },
            "Cabinet Industry Network is building Australia's central hub for cabinet industry professionals. Find opportunities, connect with skilled people and stay informed about what's happening across the industry.",
          ),
          e(
            "div",
            { className: "mt-8 flex max-w-md flex-col items-stretch gap-3 sm:items-start" },
            e(
              ActionButton,
              {
                icon: "arrow-right",
                variant: "primary",
                onClick: () => handleHeroClick(),
              },
              "Join the Network",
            ),
            e(
              "p",
              { className: "text-center text-sm font-semibold leading-6 text-neutral-200 sm:text-left" },
              "Be among the first members and receive industry updates.",
            ),
          ),
          e(
            "div",
            { className: "mt-6 grid gap-3 text-sm font-semibold text-neutral-100 sm:grid-cols-3" },
            trustHighlights.map(([icon, text]) =>
              e(
                "div",
                {
                  key: text,
                  className:
                    "flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-3",
                },
                e(Icon, { name: icon, className: "h-4 w-4 shrink-0 text-[#e2bd74]" }),
                e("span", null, text),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

function WordOfMouthSection() {
  return e(
    "section",
    { className: "bg-white px-5 py-16 md:px-8 md:py-20" },
    e(
      "div",
      { className: "mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start" },
      e(
        "div",
        null,
        e("p", { className: "mb-3 text-sm font-semibold uppercase text-[#a8792f]" }, "The problem"),
        e(
          "h2",
          { className: "text-3xl font-bold leading-tight text-neutral-950 md:text-4xl" },
          "The Cabinet Industry Is Still Running on Word of Mouth",
        ),
      ),
      e(
        "div",
        { className: "text-base leading-8 text-neutral-600 md:text-lg" },
        e(
          "p",
          { className: "text-neutral-700" },
          "Finding skilled cabinetmakers, installers, CNC operators, detailers and subcontractors is still scattered across Facebook groups, SEEK, phone calls and word of mouth. Cabinet Industry Network is being built to create one central place for Australia's cabinetmaking industry to connect.",
        ),
        e(
          "div",
          { className: "mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" },
          ["Facebook groups", "SEEK", "Phone calls", "Word of mouth"].map((item) =>
            e(
              "div",
              {
                key: item,
                className:
                  "rounded-lg border border-neutral-200 bg-[#f8f7f4] px-4 py-3 text-sm font-semibold text-neutral-800",
              },
              item,
            ),
          ),
        ),
      ),
    ),
  );
}

function HowCard({ icon, title, children }) {
  return e(
    "article",
    { className: "rounded-lg border border-neutral-200 bg-white p-6 shadow-sm" },
    e(
      "div",
      { className: "mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#f3ead8] text-[#a8792f]" },
      e(Icon, { name: icon, className: "h-5 w-5" }),
    ),
    e("h3", { className: "text-xl font-bold text-neutral-950" }, title),
    e("p", { className: "mt-3 leading-7 text-neutral-600" }, children),
  );
}

function HowItWorks() {
  return e(
    "section",
    { className: "bg-[#f8f7f4] px-5 py-16 md:px-8 md:py-20" },
    e(
      "div",
      { className: "mx-auto max-w-7xl" },
      e(
        SectionHeader,
        {
          eyebrow: "How it works",
          title: "A simpler way to find the right cabinet industry connection.",
        },
        "Build a clear industry profile, browse relevant opportunities and reach out directly when the fit is right.",
      ),
      e(
        "div",
        { className: "mt-10 grid gap-5 md:grid-cols-3" },
        e(
          HowCard,
          { icon: "user-round-plus", title: "Create your profile" },
          "Add your trade, location, availability and the kind of work or people you are looking for, so future matches are relevant from the start.",
        ),
        e(
          HowCard,
          { icon: "search-check", title: "Find opportunities or skilled people" },
          "Browse cabinet-specific roles, contractors, installers, factory support and overflow options without sorting through unrelated listings.",
        ),
        e(
          HowCard,
          { icon: "messages-square", title: "Connect directly" },
          "Reach out through an industry-focused network designed around practical trade and business needs.",
        ),
      ),
    ),
  );
}

function AudienceSection() {
  return e(
    "section",
    { className: "bg-white px-5 py-16 md:px-8 md:py-20" },
    e(
      "div",
      { className: "mx-auto max-w-7xl" },
      e(
        SectionHeader,
        {
          eyebrow: "Who should join",
          title: "Who Should Join?",
        },
        "Cabinet Industry Network is for businesses, trades, apprentices and industry partners who want a more direct way to find people, work and opportunities.",
      ),
      e(
        "div",
        { className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" },
        audienceCards.map(([icon, title, description]) =>
          e(
            "article",
            {
              key: title,
              className:
                "rounded-lg border border-neutral-200 bg-white p-5 shadow-sm",
            },
            e(
              "div",
              { className: "mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#f3ead8] text-[#a8792f]" },
              e(Icon, { name: icon, className: "h-5 w-5" }),
            ),
            e("h3", { className: "text-base font-bold text-neutral-950" }, title),
            e("p", { className: "mt-2 text-sm leading-6 text-neutral-600" }, description),
          ),
        ),
      ),
    ),
  );
}

function SocialProofSection() {
  return e(
    "section",
    { className: "bg-white px-5 py-10 md:px-8" },
    e(
      "div",
      {
        className:
          "mx-auto flex max-w-7xl flex-col gap-4 rounded-lg border border-neutral-200 bg-[#111a1f] px-5 py-6 text-white sm:flex-row sm:items-center sm:justify-between md:px-7",
      },
      e(
        "div",
        { className: "flex items-start gap-3" },
        e(
          "div",
          { className: "mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#c4933d] text-white" },
          e(Icon, { name: "users-round", className: "h-5 w-5" }),
        ),
        e(
          "p",
          { className: "max-w-3xl text-base font-semibold leading-7 md:text-lg" },
          "Be part of the first group shaping Australia's cabinetmaking industry network.",
        ),
      ),
      e(
        "a",
        {
          href: "#signup",
          className:
            "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#111a1f] transition hover:bg-[#f8f7f4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        },
        e(Icon, { name: "arrow-right", className: "h-4 w-4" }),
        "Join early",
      ),
    ),
  );
}

function WhyJoinEarlySection() {
  return e(
    "section",
    { className: "bg-[#f8f7f4] px-5 py-16 md:px-8 md:py-20" },
    e(
      "div",
      { className: "mx-auto max-w-7xl" },
      e(
        "div",
        { className: "grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start" },
        e(
          "div",
          null,
          e("p", { className: "mb-3 text-sm font-semibold uppercase text-[#a8792f]" }, "Early access"),
          e(
            "h2",
            { className: "text-3xl font-bold leading-tight text-neutral-950 md:text-4xl" },
            "Why Join Early?",
          ),
          e(
            "p",
            { className: "mt-5 text-base leading-8 text-neutral-700 md:text-lg" },
            "The first members will help shape a professional, industry-specific network built around the real hiring, subcontracting and workforce needs of cabinet and joinery businesses.",
          ),
          e(
            "a",
            {
              href: "#signup",
              className:
                "mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#111a1f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1a252b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4933d]",
            },
            e(Icon, { name: "arrow-right", className: "h-4 w-4" }),
            "Join the early access list",
          ),
        ),
        e(
          "div",
          { className: "grid gap-4" },
          earlyBenefits.map(([icon, title, description]) =>
            e(
              "article",
              {
                key: title,
                className:
                  "grid gap-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:grid-cols-[auto_1fr] sm:items-start",
              },
              e(
                "div",
                { className: "flex h-11 w-11 items-center justify-center rounded-lg bg-[#f3ead8] text-[#a8792f]" },
                e(Icon, { name: icon, className: "h-5 w-5" }),
              ),
              e(
                "div",
                null,
                e("h3", { className: "text-base font-bold text-neutral-950" }, title),
                e("p", { className: "mt-2 text-sm leading-6 text-neutral-600" }, description),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

function Field({ label, id, children }) {
  return e(
    "label",
    { htmlFor: id, className: "block" },
    e("span", { className: "mb-2 block text-sm font-semibold text-neutral-800" }, label),
    children,
  );
}

function SignupForm({ selectedInterest }) {
  const initialForm = useMemo(
    () => ({
      name: "",
      email: "",
      state: "",
      role: "",
      interest: selectedInterest || "",
    }),
    [],
  );
  const [form, setForm] = useState(initialForm);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (selectedInterest) {
      setForm((current) => ({ ...current, interest: selectedInterest }));
    }
  }, [selectedInterest]);

  const updateField = (field) => (event) => {
    setSubmitStatus("idle");
    setSubmitMessage("");
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const record = {
      name: form.name.trim(),
      email: form.email.trim(),
      state: form.state,
      role: form.role,
      interest: form.interest,
    };

    setSubmitStatus("loading");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "The signup could not be saved.");
      }

      setSubmitStatus("success");
      setSubmitMessage("Thanks for joining Cabinet Industry Network. We'll be in touch as the platform develops.");
      setForm({
        name: "",
        email: "",
        state: "",
        role: "",
        interest: selectedInterest || "",
      });
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        `Sorry, your signup could not be saved. Please try again or email ${CIN_BRAND.email}.`,
      );
    }
  };

  return e(
    "form",
    {
      onSubmit: submitForm,
      className: "rounded-lg bg-white p-5 shadow-2xl shadow-black/25 md:p-7",
    },
    e("div", { className: "grid gap-5" },
      e(
        Field,
        { label: "Name", id: "name" },
        e("input", {
          id: "name",
          name: "name",
          type: "text",
          required: true,
          value: form.name,
          onChange: updateField("name"),
          className: "field-control",
          placeholder: "Your name",
        }),
      ),
      e(
        Field,
        { label: "Email", id: "email" },
        e("input", {
          id: "email",
          name: "email",
          type: "email",
          required: true,
          value: form.email,
          onChange: updateField("email"),
          className: "field-control",
          placeholder: "you@business.com.au",
        }),
      ),
      e(
        Field,
        { label: "State/Territory", id: "state" },
        e(
          "select",
          {
            id: "state",
            name: "state",
            required: true,
            value: form.state,
            onChange: updateField("state"),
            className: "field-control",
          },
          e("option", { value: "" }, "Select your state or territory"),
          states.map((state) => e("option", { key: state, value: state }, state)),
        ),
      ),
      e(
        Field,
        { label: "I am a:", id: "role" },
        e(
          "select",
          {
            id: "role",
            name: "role",
            required: true,
            value: form.role,
            onChange: updateField("role"),
            className: "field-control",
          },
          e("option", { value: "" }, "Select your role"),
          roles.map((role) => e("option", { key: role, value: role }, role)),
        ),
      ),
      e(
        Field,
        { label: "I'm interested in:", id: "interest" },
        e(
          "select",
          {
            id: "interest",
            name: "interest",
            required: true,
            value: form.interest,
            onChange: updateField("interest"),
            className: "field-control",
          },
          e("option", { value: "" }, "Select an interest"),
          interests.map((interest) => e("option", { key: interest, value: interest }, interest)),
        ),
      ),
    ),
    e(
      "button",
      {
        type: "submit",
        disabled: submitStatus === "loading",
        className:
          "mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#111a1f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1a252b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4933d] disabled:cursor-wait disabled:opacity-70",
      },
      e(Icon, { name: "send", className: "h-4 w-4" }),
      submitStatus === "loading" ? "Saving..." : "Register interest",
    ),
    submitMessage &&
      e(
        "div",
        {
          role: submitStatus === "error" ? "alert" : "status",
          className: [
            "mt-4 rounded-lg border px-4 py-3 text-sm font-semibold",
            submitStatus === "error"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-[#b8c7bc] bg-[#eef5ef] text-[#304737]",
          ].join(" "),
        },
        submitMessage,
      ),
    e(
      "p",
      { className: "mt-4 text-xs leading-5 text-neutral-500" },
      `No spam. Submissions are sent securely to Google Sheets, and the same field structure can be reused later with ${FORM_INTEGRATION_TARGETS}.`,
    ),
  );
}

function SignupSection({ selectedInterest }) {
  return e(
    "section",
    { id: "signup", className: "bg-[#111a1f] px-5 py-16 text-white md:px-8 md:py-20" },
    e(
      "div",
      { className: "mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" },
      e(
        "div",
        null,
        e("p", { className: "mb-3 text-sm font-semibold uppercase text-[#e2bd74]" }, "Join early"),
        e(
          "h2",
          { className: "text-3xl font-bold leading-tight text-white md:text-5xl" },
          "Help shape the Cabinet Industry Network before launch.",
        ),
        e(
          "p",
          { className: "mt-5 max-w-xl text-base leading-8 text-neutral-300 md:text-lg" },
          "Leave your details and we will use the early access list to understand demand across roles, locations and industry needs. No noise, just relevant launch and industry updates.",
        ),
        e(
          "div",
          { className: "mt-8 grid gap-4 sm:grid-cols-3 lg:max-w-xl" },
          [
            ["users-round", "Industry-specific"],
            ["map-pin", "Australia-wide"],
            ["shield-check", "Built on trust"],
          ].map(([icon, text]) =>
            e(
              "div",
              {
                key: text,
                className:
                  "rounded-lg border border-white/15 bg-white/5 px-4 py-4 text-sm font-semibold text-neutral-100",
              },
              e(Icon, { name: icon, className: "mb-3 h-5 w-5 text-[#e2bd74]" }),
              text,
            ),
          ),
        ),
      ),
      e(SignupForm, { selectedInterest }),
    ),
  );
}

function ComingSoonSection() {
  return e(
    "section",
    { className: "bg-white px-5 py-16 md:px-8 md:py-20" },
    e(
      "div",
      { className: "mx-auto max-w-7xl" },
      e(SectionHeader, {
        eyebrow: "Coming soon",
        title: "The first platform features are focused on practical industry needs.",
      }),
      e(
        "div",
        { className: "mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3" },
        comingSoon.map(([title, description]) =>
          e(
            "article",
            {
              key: title,
              className:
                "rounded-lg border border-neutral-200 bg-[#f8f7f4] p-5 shadow-sm",
            },
            e(Icon, { name: "circle-dot", className: "h-5 w-5 text-[#a8792f]" }),
            e("h3", { className: "mt-4 text-base font-bold text-neutral-950" }, title),
            e("p", { className: "mt-3 text-sm leading-6 text-neutral-600" }, description),
          ),
        ),
      ),
    ),
  );
}

function Footer() {
  return e(
    "footer",
    { className: "bg-[#111a1f] px-5 py-10 text-white md:px-8" },
    e(
      "div",
      { className: "mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" },
      e(
        "div",
        null,
        e("img", {
          src: CIN_BRAND.logoFooter,
          alt: CIN_BRAND.name,
          className: "h-12 w-auto object-contain sm:h-14",
        }),
        e("p", { className: "mt-2 text-sm text-neutral-300" }, CIN_BRAND.tagline),
      ),
      e(
        "a",
        {
          href: `mailto:${CIN_BRAND.email}`,
          className:
            "text-sm font-semibold text-[#e2bd74] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
        },
        `Contact: ${CIN_BRAND.email}`,
      ),
    ),
  );
}

function App() {
  const [selectedInterest, setSelectedInterest] = useState("");

  useEffect(() => {
    window.lucide?.createIcons();
  });

  return e(
    React.Fragment,
    null,
    e("main", { id: "top" },
      e(Hero, { onSelectInterest: setSelectedInterest }),
      e(WordOfMouthSection),
      e(HowItWorks),
      e(AudienceSection),
      e(SocialProofSection),
      e(WhyJoinEarlySection),
      e(SignupSection, { selectedInterest }),
      e(ComingSoonSection),
    ),
    e(Footer),
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(e(App));
