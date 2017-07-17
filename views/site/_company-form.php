<?php
/* @var $company app\models\Company */

use yii\bootstrap\Html;
use yii\bootstrap\ActiveForm;
?>

<?php
$form = ActiveForm::begin();

echo Html::activeHiddenInput($company, 'id');
echo $form->field($company, 'name');
echo $form->field($company, 'quota');
echo Html::submitButton('Save', ['class' => 'btn btn-primary']);

ActiveForm::end();
