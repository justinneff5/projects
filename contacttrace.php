<?php
    //require 'database.php';
    $user = null; //import from js input!
    $primarycontacts = [];
    $secondarycontacts = [][]; //I don't know if we can declare like this
    $tertiarycontacts = [][][];
    $notifications = [];
    $riskQ = null;
    $statusQ = null;
    $countcontacts = 0;

    $istatement = $mysqli->prepare("SELECT user2 FROM connections WHERE user1 = ?");
    $istatement->bind_param('s', $user);
    $istatement->execute();
    $istatement->bind_result($primarycontacts);
    $istatement->close();

    for (i = 0; i < primarycontacts.length; i++) {
        $countcontacts++;
        $statusstmt = $mysqli->prepare("SELECT status FROM users WHERE username = ?");
        $statusstmt->bind_param('s', $primarycontacts[i]);
        $statusstmt->execute();
        $statusstmt->bind_result($statusQ);
        $statusstmt->close();
        if ($statusQ == "positive") { //sets user risk to yes from a contact
            $alterstmt = $mysqli->prepare("UPDATE users SET risk = "yes" WHERE username = ?");
            $alterstmt->bind_param('s', $user);
            $alterstmt->execute();
            $alterstmt->close();
        }
        $riskstmt = $mysqli->prepare("SELECT risk FROM users WHERE username = ?");
        $riskstmt->bind_param('s', $primarycontacts[i]);
        $riskstmt->execute();
        $riskstmt->bind_result($statusQ);
        $riskstmt->close();
        if ($riskQ == "yes") { //sets user risk to yes from a contact
            $alterstmt = $mysqli->prepare("UPDATE users SET risk = "yes" WHERE username = ?");
            $alterstmt->bind_param('s', $user);
            $alterstmt->execute();
            $alterstmt->close();
            $notifications
        }
    }



?>