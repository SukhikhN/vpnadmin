<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\bootstrap\Html;
use yii\bootstrap\NavBar;
use yii\widgets\Pjax;
use app\assets\AppAsset;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>

<div class="wrap">
    <?php
    NavBar::begin([
        'brandLabel' => 'VPN Admin',
        'brandUrl' => Yii::$app->homeUrl,
        'options' => [
            'class' => 'navbar-inverse navbar-fixed-top',
        ],
    ]);
    NavBar::end();
    ?>

    <?php Pjax::begin(['options' => ['id'=>'pjax', 'class'=>'container'] ]); ?>
    <?php
    $links = [
        'site/companies' => 'Companies',
        'site/users' => 'Users',
        'site/abusers' => 'Abusers',
    ]
    ?>
    <ul id="tabs" class="nav nav-tabs">
        <?php
        $currRoute = Yii::$app->controller->route;
        foreach ($links as $route => $text) {
            echo Html::tag('li', Html::a(Html::encode($text), [$route]), [
                'class' => $route===$currRoute? 'active' : false,
            ]);
        }
        ?>
    </ul>
    <div class="page-container">
    <?= $content ?>
    </div>
    <div class="loader"></div>
    <?php Pjax::end(); ?>
</div>

<footer class="footer">
    <div class="container">
        <p class="pull-left">&copy; Nick Sukhikh <?= date('Y') ?></p>

        <p class="pull-right"><?= Yii::powered() ?></p>
    </div>
</footer>

<?= $this->render('/_templates'); ?>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
