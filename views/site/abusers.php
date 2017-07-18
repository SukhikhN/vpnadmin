<?php
/* @var $this yii\web\View */
/* @var array $months */

use yii\bootstrap\Html;

$this->title = 'Abusers';
?>
<div id="abusers-container">
    <?= Html::dropDownList('date', null, $months); ?>
    <button class="btn btn-primary" name="report">Show report</button>
    <button class="btn btn-secondary" name="generate">Generate data</button>
    
    <table id="abusers" class="table table-hover">
        <thead><tr>
            <th>Company</th>
            <th>Used</th>
            <th>Quota</th>
        </tr></thead>
        <tbody>
        </tbody>
    </table>
</div>
