<?php
/* @var $user app\models\User */

use yii\bootstrap\Html;
use yii\bootstrap\ActiveForm;
?>

<?php $form = ActiveForm::begin([
    'options' => [
        'id' => 'user-form-'.$user->id,
    ],
]); ?>

<?= Html::activeHiddenInput($user, 'id'); ?>
<?= $form->field($user, 'name'); ?>
<?= $form->field($user, 'email'); ?>
<?= $form->field($user, 'company_id'); ?>
<?= Html::submitButton('Save', ['class' => 'btn btn-primary']); ?>
 <?= Html::button('Cancel', ['class' => 'btn btn-secondary', 'name' => 'cancel-form']); ?>

<?php
ActiveForm::end();
