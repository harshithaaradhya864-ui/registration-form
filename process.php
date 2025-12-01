<?php
// process.php
// Save this as process.php in the same folder as index.html and style.css

function e($s) {
    return htmlspecialchars(trim((string)$s), ENT_QUOTES, 'UTF-8');
}

// show simple message and link if accessed directly (GET)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ?>
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Form result</title>
      <link rel="stylesheet" href="style.css">
      <style>
        .notice { max-width:800px; margin:40px auto; padding:20px; background:#fff; border-radius:8px; box-shadow:0 6px 18px rgba(0,0,0,0.04); }
        a{ color: #2b6cb0; text-decoration:none; font-weight:600; }
      </style>
    </head>
    <body>
      <main class="container">
        <div class="notice">
          <h2>Not a POST request</h2>
          <p>This page expects the form to be submitted via POST.</p>
          <p><a href="index.html">&larr; Go back to the form</a></p>
        </div>
      </main>
    </body>
    </html>
    <?php
    exit;
}

// collect and sanitize
$firstName = e($_POST['firstName'] ?? '');
$lastName  = e($_POST['lastName'] ?? '');
$email     = e($_POST['email'] ?? '');
$phone     = e($_POST['phone'] ?? '');
$dob       = e($_POST['dob'] ?? '');
$country   = e($_POST['country'] ?? '');
$gender    = e($_POST['gender'] ?? '');
$bio       = e($_POST['bio'] ?? '');

// skills[] may be an array
$skills = [];
if (!empty($_POST['skills']) && is_array($_POST['skills'])) {
    foreach ($_POST['skills'] as $s) {
        $skills[] = e($s);
    }
}

// small helper to format date (if provided)
$dobDisplay = $dob ? date('d M Y', strtotime($dob)) : '<span class="muted">Not provided</span>';
$avatar = ($firstName?mb_strtoupper(mb_substr($firstName,0,1)):'U') . ($lastName?mb_strtoupper(mb_substr($lastName,0,1)):'');
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Submission result</title>
  <link rel="stylesheet" href="style.css">
  <style>
    /* tiny override to ensure the result block looks good */
    .result { margin-top: 2rem; padding: 1.25rem; }
    .profile-card { gap: 1rem; align-items: start; }
    .avatar { width:120px; height:120px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.4rem; }
    .kv span { display:inline-block; margin-right:.5rem; }
  </style>
</head>
<body>
  <main class="container">
    <h1>Submission Received</h1>

    <section class="result">
      <div class="profile-card">
        <div class="avatar"><?= $avatar ?></div>

        <div>
          <div class="card-head">
            <div>
              <div class="name"><?= $firstName . ' ' . $lastName ?></div>
              <div class="muted"><?= $email ?> &nbsp;·&nbsp; <?= $phone ?: '<span class="muted">No phone</span>' ?></div>
            </div>
            <div class="muted"><?= $country ?: '<span class="muted">No country</span>' ?></div>
          </div>

          <div class="kv" style="margin-top:.6rem">
            <span>Gender: <?= $gender ?: '<span class="muted">Not set</span>' ?></span>
            <span>Date of birth: <?= $dobDisplay ?></span>
            <span>Skills: </span>
          </div>

          <div class="kv" style="margin-top:.5rem">
            <?php
              if (count($skills)) {
                foreach ($skills as $s) {
                  echo "<span>" . $s . "</span>";
                }
              } else {
                echo '<span class="muted">None</span>';
              }
            ?>
          </div>

          <div class="bio" style="margin-top:.75rem"><?= $bio ?: '<i class="muted">No bio provided</i>' ?></div>
        </div>
      </div>

      <p style="margin-top:1rem"><a href="index.html">← Back to form</a></p>
    </section>
  </main>
</body>
</html>
