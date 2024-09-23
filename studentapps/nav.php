<div class="collapse" id="navbarToggleExternalContent">
    <div class="bg-dark p-3 text-end">
        <span class="px-4 text-white h4 "><a class="noStyle" href="exercises.php">EGZERSİZLER</a></span>
        <span class="px-4 text-white h4 "><a class="noStyle" href="result.php">RAPORUM</a></span>
        <span id="exit" class="px-4 text-white h4 "><a class="noStyle" href="">ÇIKIŞ</a></span>
    </div>
</div>
<nav id="nav_menu" class="navbar navbar-dark bg-dark">

    <div class="container-fluid d-flex flex-row-reverse">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <span class="p-2"><a href="index.php" class="text-white h4 site_title"><img style="width: 40px; height: 40px; margin-right: 5px;" src="images/neuro.ico"><span>NeuroSpeed</span></a></span>

    </div>
</nav>

<script>
    document.getElementById("exit").addEventListener("click", function(e) {
        localStorage.removeItem("user");
        localStorage.removeItem("dealer");
        window.location = "../login.php";
        e.preventDefault();
    });
</script>