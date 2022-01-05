const express = require("express"); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

// This displays message that the server running and listening to specified port  https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html
// app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.get("/json", (req, res) => {
  //   console.log("called");
  // res.send("YOUR EXPRESS BACKEND IS CONNECTED TO REACT"); //Line 10
  //   res.setHeader("Content-Type", "application/json");
  //   res.end(JSON.stringify({ a: 1 }, null, 3));
  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: "Users retrieved",
    status: true,
    data: [
      {
        id: "0F8JIqi4zwvb77FGz6Wt",
        lastName: "RIDAM",
        firstName: "Heinz-Georg",
        email: "heinz-georg.fiedler@example.com",
        title: "mr",
        picture: "https://mjajaj.s3.amazonaws.com/download+(1).jpeg"
      },
      {
        id: "0P6E1d4nr0L1ntW8cjGU",
        picture: "https://mjajaj.s3.amazonaws.com/download+(2).jpeg",
        lastName: "Hughes",
        email: "katie.hughes@example.com",
        title: "miss",
        firstName: "Katie"
      },
      {
        id: "1Lkk06cOUCkiAsUXFLMN",
        title: "mr",
        lastName: "Aasland",
        firstName: "Vetle",
        picture: "https://mjajaj.s3.amazonaws.com/download+(3).jpeg",
        email: "vetle.aasland@example.com"
      },
      {
        id: "1OuR3CWOEsfISTpFxsG7",
        picture: "https://mjajaj.s3.amazonaws.com/download.jpeg",
        lastName: "Vasquez",
        email: "dylan.vasquez@example.com",
        title: "mr",
        firstName: "Dylan"
      },
      {
        id: "1pRsh5nXDIH3pjEOZ17A",
        lastName: "Vicente",
        title: "miss",
        firstName: "Margarita",
        email: "margarita.vicente@example.com",
        picture: "https://mjajaj.s3.amazonaws.com/images+(1).jpeg"
      }
    ]
  });
});

app.listen(7878);
