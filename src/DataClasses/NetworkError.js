class NetworkError {
  constructor(message = "") {
    const date = new Date();
    this.message = message;
    this.timestamp =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }
}

export default NetworkError;
