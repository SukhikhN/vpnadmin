<?php
namespace app\controllers;

use yii\rest\Controller;

class AbusersController extends Controller {
    
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        //disable rate limiter
        if (isset($behaviors['rateLimiter']))
            unset($behaviors['rateLimiter']);

        return $behaviors;
    }
    
    public function actionGenerate() {
        return [
            'status' => \Yii::$app->response->statusCode,
        ];
    }
}
