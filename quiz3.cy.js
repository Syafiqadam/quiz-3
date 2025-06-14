describe("Fitur Login - OrangeHRM", () => {
  const baseUrl =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
  const orangehrmUrl = "https://www.orangehrm.com/";

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("Login berhasil dengan kredensial valid", () => {
    cy.get("input[name='username']").type("Admin");
    cy.get("input[name='password']").type("admin123");
    cy.get("button[type='submit']").click();

    cy.url().should("include", "/dashboard");
    cy.get("h6").should("contain.text", "Dashboard");
  });

  it("Login gagal dengan password salah", () => {
    cy.get("input[name='username']").type("Admin");
    cy.get("input[name='password']").type("adam123");
    cy.get("button[type='submit']").click();

    cy.get(".oxd-alert-content").should("contain.text", "Invalid credentials");
  });

  it("Login gagal dengan username salah", () => {
    cy.get("input[name='username']").type("syafiq121");
    cy.get("input[name='password']").type("admin123");
    cy.get("button[type='submit']").click();

    cy.get(".oxd-alert-content").should("contain.text", "Invalid credentials");
  });

  it("Login gagal dengan username kosong", () => {
    cy.get("input[name='password']").type("admin123");
    cy.get("button[type='submit']").click();

    cy.get(".oxd-input-field-error-message")
      .should("contain.text", "Required")
      .and("have.length.at.least", 1);
  });

  it("Login gagal dengan password kosong", () => {
    cy.get("input[name='username']").type("Admin");
    cy.get("button[type='submit']").click();

    cy.get(".oxd-input-field-error-message")
      .should("contain.text", "Required")
      .and("have.length.at.least", 1);
  });

  it("Login gagal dengan username dan password kosong", () => {
    cy.get("button[type='submit']").click();

    cy.get(".oxd-input-field-error-message")
      .should("contain.text", "Required")
      .and("have.length.at.least", 2);
  });

  it("User diarahkan ke halaman reset password saat klik 'Forgot your password?'", () => {
    cy.contains("Forgot your password?").click();

    cy.url().should("include", "/requestPasswordResetCode");
    cy.get("h6").should("contain.text", "Reset Password");
  });

  it("Validasi link 'ahsik' tidak tersedia", () => {
    cy.contains("ahsik").should("not.exist");

    cy.get("body").then(($body) => {
      if ($body.text().includes("ahsik")) {
        throw new Error("Link atau teks 'ahsik' tidak seharusnya muncul.");
      } else {
        cy.log("'ahsik' tidak ditemukan, sesuai negative case.");
      }
    });
  });

  it("Validasi link 'nmnmnm' tidak tersedia", () => {
    cy.contains("nmnmnm").should("not.exist");

    cy.get("body").then(($body) => {
      if ($body.text().includes("nmnmnm")) {
        throw new Error("Link atau teks 'nmnmnm' tidak seharusnya muncul.");
      } else {
        cy.log("'nmnmnm' tidak ditemukan, sesuai negative case.");
      }
    });
  });
});
