<?php

namespace app\controllers;

use yii\web\Controller;
use yii\web\NotFoundHttpException;
use app\models\Company;

class AjaxController extends Controller {
    public function actionCompanyForm($id) {
        if ($id===0) {
            $company = new Company();
        } else {
            $company = Company::findOne($id);
        }
        
        if ($company===null)
            throw new NotFoundHttpException();
        return $this->renderAjax('company-form', ['company'=>$company]);
    }
}
