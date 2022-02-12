class UpdateUserClass {
  constructor(
    firstName = "",
    lastName = "",
    username = "",
    dob = "",
    password = "",
    photoUrl = ""
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.dob = dob;
    this.password = password;
    this.photoUrl = photoUrl;
  }
}

export default UpdateUserClass;
