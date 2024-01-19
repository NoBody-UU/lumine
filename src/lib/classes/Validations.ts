
export class Validations {

  static validateEnv(): void {
    if (!process.env.TOKEN) {
      console.log("No token provided");
      process.exit(1);
    }
  }


  
}