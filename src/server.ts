import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { envVars } from './app/config/env';
let server: Server;

const startServer=async ()=> {
    try {
        await mongoose.connect(envVars.DB_URL);
        console.log('Connected to MongoDB');
        server = app.listen(envVars.PORT, () => {
            console.log(`Server is running on port ${envVars.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();
process.on("unhandledRejection",()=>{
    console.log("Unhandled Rejection Detected ... Server shutting down..");
    if(server){
        server.close(()=>{
            process.exit(1);
        });
    }
    process.exit(1);
})
process.on("uncaughtException",()=>{
    console.log("uncaught Exception Detected ... Server shutting down..");
    if(server){
        server.close(()=>{
            process.exit(1);
        });
    }
    process.exit(1);
})
process.on("SIGTERM",()=>{
    console.log("Sigterm signal received ... Server shutting down..");
    if(server){
        server.close(()=>{
            process.exit(1);
        });
    }
    process.exit(1);
})