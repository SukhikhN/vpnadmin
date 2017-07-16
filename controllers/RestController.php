<?php

namespace app\controllers;

use yii\rest\ActiveController;

class RestController extends ActiveController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        
        //disable rate limiter
        if (isset($behaviors['rateLimiter']))
            unset($behaviors['rateLimiter']);
        
        return $behaviors;
    }
}
