const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

const dotenv = require("dotenv");
dotenv.config();

module.exports = async function(context, req) {
  const account = process.env.API_FUNC_STORAGE_ACCOUNT;
  const accountKey = process.env.API_FUNC_STORAGE_ACCOUNT_KEY;
  // Azure Storage client & authentication
  const sharedKeyCredential = new StorageSharedKeyCredential(
    account,
    accountKey
  );
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );
  const bodyData = await req.body;
  const containerName = "my-container";
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const content = bodyData.fileBody;
  const blobName = bodyData.storageFileName;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.upload(content, content.length);

  const response = {
    message: "Operation Completed Successfully",
    result: "OK",
  };

  context.res = {
    status: 200,
    body: response,
  };
};
