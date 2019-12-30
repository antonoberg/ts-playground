/* eslint-disable @typescript-eslint/no-unused-vars */
export class User {
  public name: string
  public id: string
  public email: string

  constructor({
    name,
    id,
    email,
  }: {
    name: string
    id: string
    email: string
  }) {
    this.name = name
    this.id = id
    this.email = email
  }
}

export class NewUser {
  public name: string
  public email: string

  constructor({ name, email }: { name: string; email: string }) {
    this.name = name
    this.email = email
  }
}

export interface UserResource {
  getById({ id }: { id: string }): Promise<User>
  createOne(input: NewUser): Promise<User>
  updateOne(input: Partial<User>): Promise<User>
}
