const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const AppError = require("../utils/AppError")

describe("UserCreateService", () => {
  let userRepositoryInMemory = null
  let userCreateService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })

  it("user should be created", async () => {
    const user = {
      name: "User",
      email: "user@test.com",
      password: "123",
    }

    const userCreated = await userCreateService.execute(user)

    //console.log(userCreated)

    expect(userCreated).toHaveProperty("id")
  })

  it("user should not be created with existent email", async () => {
    const user1 = {
      name: "User 1",
      email: "user@test.com",
      password: "123",
    }

    const user2 = {
      name: "User 2",
      email: "user@test.com",
      password: "1234",
    }

    await userCreateService.execute(user1)
    await expect(userCreateService.execute(user2)).rejects.toEqual(
      new AppError("Este email já está em uso!")
    )
  })
})
