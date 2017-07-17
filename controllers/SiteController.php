<?php

namespace app\controllers;

use Yii;
use yii\helpers\Url;
use yii\web\Controller;

class SiteController extends Controller
{
    public $jsVars = [];
    
    public function init() {
        parent::init();
        $this->on(self::EVENT_BEFORE_ACTION, [$this, 'onBeforeAction']);
    }
    
    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    /**
     * Displays companies list.
     *
     * @return string
     */
    public function actionCompanies()
    {
        return $this->render('companies');
    }

    /**
     * Displays users list.
     *
     * @return string
     */
    public function actionUsers()
    {
        return $this->render('users');
    }

    /**
     * Displays abusers page.
     *
     * @return string
     */
    public function actionAbusers()
    {
        return $this->render('abusers');
    }
    
    protected function onBeforeAction() {
        $this->jsVars['action'] = $this->action->uniqueId;
        $this->jsVars['apiUrl'] = Url::home(true);
    }
}
