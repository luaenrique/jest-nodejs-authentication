const bcrypt = require("bcryptjs");

const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should encrypt user password", async () => {
    const user = await User.create({
      name: "Luã Enrique Zangrande",
      email: "lua.enrique@gmail.com.br",
      password: "123123123123"
    });

    const compareHash = await bcrypt.compare("123123123123", user.password_hash);

    expect(compareHash).toBe(true);
  });
});