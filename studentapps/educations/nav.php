<nav id="nav_menu" class="navbar navbar-dark bg-dark mx-0 my-0">


    <div class="container-fluid d-flex flex-row-reverse">
        <span class="text-white">
            <span id="question" class="fas fa-question mx-2"></span>
            <span id="times" class="fa fa-times mx-2"></span>
        </span>
        <?php if (isset($_GET['t'])) { ?>
            <span style="margin-right: 130px;" class="text-white">
                <span id="learn1" class="text-white rounded-circle mx-1 "><i class="far fa-circle rounded-circle"></i></span>
                <span id="learn2" class="text-white rounded-circle mx-1 "><i class="far fa-circle rounded-circle"></i></span>
                <span id="learn3" class="text-white rounded-circle mx-1 "><i class="far fa-circle rounded-circle"></i></span>
                <span id="learn4" class="text-white rounded-circle mx-1 "><i class="far fa-circle rounded-circle"></i></span>
                <span id="learn5" class="text-white rounded-circle mx-1 "><i class="far fa-circle rounded-circle"></i></span>
                <span id="learn6" class="text-white rounded-circle mx-1 "><i class="far fa-circle rounded-circle"></i></span>
                <span id="learn7" class="text-white rounded-circle mx-1 "><i class="far fa-circle rounded-circle"></i></span>
                <span id="learn8" class="text-white rounded-circle mx-1 "><i class="far fa-circle rounded-circle"></i></span>
            </span>
        <?php } ?>
        <span class="text-white"><?php echo $educationname ?></span>
    </div>

</nav>