<?php
/* @var $company app\models\Company */

use yii\bootstrap\Html;
use yii\bootstrap\ActiveForm;
use app\components\Helper;
?>

<?php $form = ActiveForm::begin([
    'options' => [
        'id' => 'company-form-'.$company->id,
    ],
]); ?>

<?= Html::activeHiddenInput($company, 'id'); ?>
<?= $form->field($company, 'name'); ?>
<?=
//TODO: make separate model for this form with own validators
//so form will accept float values in quota but model will not.
$form->field($company, 'quota', [
    'inputOptions' => [
        'value'=>Helper::bToTb($company->quota), //quota is converted to terabytes 
    ],
]); ?>
<?= Html::submitButton('Save', ['class' => 'btn btn-primary']); ?>
 <?= Html::button('Cancel', ['class' => 'btn btn-secondary', 'name' => 'cancel-form']); ?>

<?php
ActiveForm::end();
