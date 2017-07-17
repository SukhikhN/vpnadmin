<?php

namespace app\components;

use yii\helpers\Json;

class View extends \yii\web\View {
    public function init() {
        parent::init();
        $this->on(self::EVENT_BEGIN_PAGE, [$this, 'onBeginPage']);
    }
    
    public function onBeginPage($event) {
        if (isset($this->context->jsVars))
            $this->registerJs('var Vars = '.Json::encode($this->context->jsVars).';', self::POS_HEAD);
    }
}