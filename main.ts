import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { DatabricksProvider, 
         DataDatabricksSparkVersion,
         InstanceProfile,
         Cluster } from "./.gen/providers/databricks";

const config = require('./config.json');

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const sparkVersion = new DataDatabricksSparkVersion(this, 'spark_latest', {
      latest: true,
      longTermSupport: true
    })

    const instanceProfile = new InstanceProfile(this, 'instance_profile', {
      instanceProfileArn: config.clusterIamProfileArn
    })

    new DatabricksProvider(this, 'databricks', {
      username: config.workspace.username,
      password: config.workspace.password,
      host: config.workspace.host
    })

    new Cluster(this, 'cluster', {
        clusterName: config.prefix + '-databricks',
        sparkVersion: sparkVersion.id,
        nodeTypeId: config.clusterNodeType,
        driverNodeTypeId: config.driverNodeType,
        autoscale: {
            minWorkers: config.minWorkers,
            maxWorkers: config.maxWorkers
        },
        awsAttributes: {
          instanceProfileArn: instanceProfile.id
        }
    });
  }
}

const app = new App();
new MyStack(app, "cdktf-databricks-cluster");
app.synth();
