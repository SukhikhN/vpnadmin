<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;

class SiteController extends Controller
{

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
}
