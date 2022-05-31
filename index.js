async function general(){
    const MongoClient = require("mongodb").MongoClient;
    let uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    try{
        await client.connect();
        console.log("connected");

        await insertObject(client, {
            "tenants":"moran family",
            "dad":"eddie",
            "age":36,
            "family":"married + 3",
            "pets":"2 dogs and a cat"
        });

        await insertError(client,"couldn't be found in data base");

        await updateProject(client,"one mill", "two mill");

        await deleteErrorById(client, {_id:ObjectId("629262ae8d875adbec091693")});

        await searchErrors(client, {_id:ObjectId("629262888d875adbec091692")});


    } catch(error){
        console.log("the error is " + error);
    } finally{
        ClientSession.close();
        console.log("the connction was closed successfully");
    }

    async function insertObject(client, project){
        let result = await client.db("projectMenegment").collection("projectType").insertOne(project);
        console.log(result);
    }    
    async function insertError(client, newError){
        let newError = await client.db("projectMenegment").collection("errors").insertOne(newError);
        console.log("new error is" + newError);
    }
    async function updateProject(client, oldParmeter, newParameter){
        let newParameter = await client.db("projectMenegment").collection("projects").updateOne({"projectBudget":oldParmeter},{$set:{"projectBudget":newParameter}});
        console.log("new budget is now two mill");
    }
    async function deleteErrorById(client,idToDelete){
        let errorId = await client.db("projectMenegment").collection("errors").remove(idToDelete);
        console.log(errorId + "has been deleted");
    }
    async function searchErrors(client, errorToSearch){
        let anError = await client.db("projectMenegment").collection("errors").findOne(errorToSearch);
        console.log("this is " + anError);
    }
}
general();