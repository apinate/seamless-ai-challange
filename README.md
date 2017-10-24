# Seamless.AI Challange

A web application allowing its users to search up to 25 company domains by entering the company names /separated by commas/.

## **Local Development Setup**

### **Workspace**
* #### Prerequisites
    * **Node.js** - see *.nvmrc* for the Node.js version, preferably use [*nvm*](https://github.com/creationix/nvm) ([installation guide](https://github.com/creationix/nvm#installation), [nvm use](https://github.com/creationix/nvm#nvmrc)).
    * To run the server make sure you provide the Google Custom Search Api Key and search engine as environment variables. For testing purposes you can add an [.env](https://www.npmjs.com/package/dotenv) file at the following location `./server/.env` file with the content 
    ```
    GOOGLE_AUTH=[your API key]
    GOOGLE_CX=[search engine]
    ```
### **Running Locally**
1. Run `npm run setup` to setup all projects dependencies.
2. Start the sever by `npm run server:run`.
3. Run the web application by `npm run app:run`.

#### **Running Tests**
You can run both the server's and app's tests by `npm test`.
