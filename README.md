
# Databricks Cluster Management by Terraform CDK

This repo builds Databricks Cluster Management by Terraform CDK.

## Setup & Initial

- Install Terraform CDK

```
$ npm install -g cdktf-cli@latest
$ cdktf --version
```

- Install databricks provider

```
$ cdktf get
``` 

## Configurations

Setting your environments with `config.json`

```
{
    "prefix": "shazi7804",
    "workspace": {
      "username": "root@example.com",
      "password": "your-password",
      "host": "your-workspace-url" // https://isv-tech-summit-{WorkspaceName}.cloud.databricks.com
    },
    "clusterIamProfileArn": "{databricks-cluster-aws-role-arn}",
    "clusterNodeType": "i3.xlarge",
    "driverNodeType": "m5d.xlarge",
    "minWorkers": 1,
    "maxWorkers": 2
}
```

## Deploy

```
$ cdktf plan
$ cdktf apply
```

