function getAllConnections(username) {
    let user = username;
    fetch('http://localhost:3001/authentication/getAllConnections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user}),
    })
      .then(response => {
        return response; 
      })
      .then(data => {
        alert(data); 
        //getUsers();
        //return data;
      });
  }

  function getStatus(username) {
    let user = username;
    fetch('http://localhost:3001/authentication/getstatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user}),
    })
      .then(response => {
        return response;
      })
      .then(data => {
        alert(data);
        //getUsers();
      });
  }

  function getRisk(username){
    let user = username;
    fetch('http://localhost:3001/authentication/risk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user}),
    })
      .then(response => {
        return response;
      })
      .then(data => {
        alert(data);
        //getUsers();
      });
  }

  function updateRisk(username) {
    let user = username;
    fetch('http://localhost:3001/updaterisk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user}),
    })
      .then(response => {
        return response;
      })
      .then(data => {
        alert(data);
        //getUsers();
      });
  }

  function contactTrace(username) {
      let user = "justin";
      let primary = [];
      let secondary = [];
      let tertiary = [];
      let notifications = [];
      let count = 0;
      let riskCheck = 0;
      let i;
      let j;
      let k;
      
      primary = getAllConnections(user);
      for (i = 0; i < primary.length; i++){
        count++;
        secondary.length = 0; //resets second array
        if (getStatus(primary[i]) == "positive") {
          notifications.push("You came in contact with " + primary[i] + " who has tested positive for covid. You need to get tested!");
          riskCheck = 1;
        }
        else if (getRisk(primary[i]) == "yes") {
          notifications.push("You came in contact with " + primary[i] + " who is at risk of being positive for covid. You need to get tested!");
          riskCheck = 1;
        }
        secondary = getAllConnections(primary[i]);
          for (j = 0; j < secondary.length; j++){
            count++;
            tertiary.length = 0; //resets tert array
            if (getStatus(secondary[j]) == "positive") {
              notifications.push("You came in secondary contact with " + secondary[j] + " who has tested positive for covid. You need to get tested!");
              riskCheck = 1;
            }
            else if (getRisk(secondary[j]) == "yes") {
              notifications.push("You came in secondary contact with " + secondary[j] + " who is at risk of being positive for covid. You need to get tested!");
              riskCheck = 1;
            }
            tertiary = getAllConnections(secondary[j]);
              for (k = 0; k < tertiary.length; k++){
                count++;
                if (getStatus(tertiary[k]) == "positive") {
                  notifications.push("You came in tertiary contact with " + secondary[j] + " who has tested positive for covid. You need to get tested!");
                  riskCheck = 1;
                }
                else if (getRisk(tertiary[k]) == "yes") {
                  notifications.push("You came in tertiary contact with " + secondary[j] + " who is at risk of being positive for covid. You need to get tested!");
                  riskCheck = 1;
                }
            }
        }
      }
      if (riskCheck == 1) {
        updateRisk(user);
      }
      notifications.forEach(function(item){
        alert(item);
      }) //probably need to populate innerhtml w this
  }