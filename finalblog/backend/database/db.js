import mongoose from "mongoose"


export const  Connection = async (USERNAME,PASSWORD) =>
{
    const URL=`mongodb://tamzid_bakht:theredowl@ac-neatvjq-shard-00-00.u8oecwi.mongodb.net:27017,ac-neatvjq-shard-00-01.u8oecwi.mongodb.net:27017,ac-neatvjq-shard-00-02.u8oecwi.mongodb.net:27017/?ssl=true&replicaSet=atlas-xbhwjc-shard-0&authSource=admin&retryWrites=true&w=majority`
        try{
        await mongoose.connect(URL, {useNewUrlParser:true});
        console.log('Database is connected successfully');
    }
    catch(error)
    {
        console.log('Error while connecting the database ', error);
    }
}
export default Connection;