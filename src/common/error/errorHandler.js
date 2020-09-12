function ErrorHandler() {
  this.handleError = async (err) => {
    console.log(`123${err}`);
    await this.sendMailToAdminIfCritical(err);
  };

  this.isTrustedError = (error) => error.isOperational;

  this.sendMailToAdminIfCritical = async (err) =>
  // TODO
    0;
}

module.exports = new ErrorHandler();
