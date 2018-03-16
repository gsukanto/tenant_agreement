# Tenant Agreement Generator

Simple web for generate & save tenant agreement generator


### Installation

Mandatory requirement:
-  [node](https://github.com/nodejs/node)
-  [npm](https://docs.npmjs.com/getting-started/installing-node)

Nice to have:
-  [nvm](https://github.com/creationix/nvm)


### Setup

After all the dependency is met, then go to the repo and do:
```bash
npm install
```

Make sure the agreements folder have write access for node:
```bash
chmod 744 agreements
```

For running the server:
```bash
node index.js
```


### Endpoint

This is all the endpoint from this service:

| Method | Route | Description |
|--------|-------|-------------|
| Get | / | Main page. Used for filling the generator and upload docx file |
| Post | /generate | Generate docx using given post form data |
| Post | /upload | Save the file to local server. The uploaded data can be found in agreements folder |