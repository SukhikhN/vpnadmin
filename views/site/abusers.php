<?php
/* @var $this yii\web\View */
/* @var array $months */

use yii\bootstrap\Html;

$this->title = 'Abusers';
?>
<div id="abusers-container">
    <form class="form-inline">
        <?= Html::dropDownList('date', null, $months, ['class'=>'form-control']); ?>
        <button class="btn btn-primary" name="report">Show report</button>
        <button class="btn btn-secondary" name="generate">Generate data</button>
        <div class="loader"></div>
    </form>

    <div id="abusers" class="table-container">
        <div class="loader"></div>
        <table id="abusers" class="table table-hover">
            <thead><tr>
                <th class="company">Company</th>
                <th class="used">Used</th>
                <th class="quota">Quota</th>
            </tr></thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>
