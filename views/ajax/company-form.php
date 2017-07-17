<?php
/* @var $company app\models\Company */

use yii\bootstrap\Html;
use yii\bootstrap\ActiveForm;
?>

<?php $form = ActiveForm::begin(); ?>

<?= Html::activeHiddenInput($company, 'id'); ?>
<?= $form->field($company, 'name'); ?>
<?= $form->field($company, 'quota'); ?>
<?= Html::submitButton('Save', ['class' => 'btn btn-primary']); ?>
 <?= Html::button('Cancel', ['class' => 'btn btn-secondary', 'name' => 'cancel-form']); ?>

<?php
ActiveForm::end();
