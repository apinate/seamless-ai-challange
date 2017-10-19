class LoggerAbstraction {
  error (error) {
    console.error(error);
  }

  info (info) {
    console.info(info);
  }
}

export default new LoggerAbstraction();
