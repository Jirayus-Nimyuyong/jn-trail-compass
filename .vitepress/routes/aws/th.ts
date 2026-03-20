export const TH = [
  {
    text: "Networking & Content Delivery/",
    collapsed: true,
    base: "th/aws/networking-&-content-delivery/",
    items: [
      { text: 'VPC', link: 'vpc' },
      { 
        text: 'CloudFront', 
        collapsed: true,
        base: 'th/aws/networking-&-content-delivery/cloudfront',
        link: '/cloudfront',         
        items:[
          { text: 'Caching', link: '/caching', },
          { text: 'ALB or EC2 as an origin', link: '/alb-or-ec2-as-an-origin', },
          { text: 'Geo Restriction', link: '/geo-restriction.md', },
          { text: 'Signed URL / Signed Cookies', link: '/signed-url&signed-cookies', },
          { text: 'Advanced', link: '/advanced', },
          { text: 'Real Time Logs', link: '/real-time-logs', },
        ]
      },
      { 
        text: 'API Gateway', 
        collapsed: true,
        base: 'th/aws/networking-&-content-delivery/api-gateway',
        link: '/api-gateway', 
        items: [
          { text: 'Deployment Stages', link: '/deployment-stages', },
          { text: 'Canary Deployment', link: '/canary-deployment', },
          { text: 'Integration Types', link: '/integration-types', },
          { text: 'Open API', link: '/open-api', },
          { text: 'Caching API responses', link: '/caching-api-responses', },
          { text: 'API Gateway - Usage Plans & API Keys', link: '/api-gaateway-usage-plans-api-keys', },
          { text: 'Logging & Tracing', link: '/logging-tracing', },
          { text: 'CORS', link: '/cors', },
          { text: 'Security', link: '/security', },
          { text: 'HTTP API vs REST API', link: '/http-api-vs-rest-api', },
          { text: 'WebSocket API', link: '/websocket-api', },
          { text: 'Architecture', link: '/architecture', }
        ]
      },
      // { text: 'Direct Connect', link: 'direct-connect' },
      // { text: 'AWS App Mesh', link: 'aws-app-mesh' },
      // { text: 'Global Accelerator', link: 'global-accelerator' },
      { 
        text: 'Route 53', 
        collapsed: true,
        base: 'th/aws/networking-&-content-delivery/route53',
        link: '/route53',
        items: [
          { text: 'TTL', link: '/ttl', },
          { text: 'CNAME vs Alias', link: '/cname-vs-alias', },
          { text: 'Routing Policies', link: '/routing-policy', },
          { text: 'Health Checks', link: '/health-checks', },
        ]
      },
      // { text: 'AWS Data Transfer Terminal', link: 'aws-data-transfer-terminal' },
      // { text: 'AWS Private 5G', link: 'aws-private-5g' },
      // { text: 'AWS Cloud Map', link: 'aws-cloud-map' },
      // { text: 'Application Recovery Controller', link: 'application-recovery-controller' },
    ],
    link: 'index'
  },   
  {
    text: 'Compute',
    collapsed: true,
    items: [
      { text: 'Compute', link: '/aws/compute/compute' },
      { 
        text: 'EC2', 
        collapsed: true,
        base: '/th/aws/compute/ec2',
        link: '/ec2', 
        items: [
          { text: 'EC2 Instance Types', link: '/ec2-instance-types' },
          { text: 'Security Groups', link: '/security-groups' },
          { text: 'SSH', link: '/ssh' },
          { text: 'EC2 Instance Connect', link: '/ec2-instance-connect' },
          { text: 'EC2 Instance Roles', link: '/ec2-instance-roles' },
          { text: 'EC2 Instance Purchasing Options', link: '/ec2-instance-purchasing-options' },
          { text: 'EBS', link: '/ebs' },
          { text: 'EBS-Snapshots', link: '/ebs-snapshots' },
          { text: 'AMI', link: '/ami.md' },
          { text: 'EC2 Instance Store', link: '/ec2-instance-store' },
          { text: 'EBS Volume Types', link: '/ebs-volume-types' },
          { text: 'EBS Multi-Attach', link: '/ebs-multi-attach' },
          { text: 'ELB', link: '/elb' },
          { text: 'CLB', link: '/clb' },
          { text: 'ALB', link: '/alb' },
          { text: 'NLB', link: '/nlb' },
          { text: 'GWLB', link: '/gwlb' },
          { text: 'ASG', link: '/asg' },
          { text: 'Instance Metadata', link: '/instance-metadata' },
          { text: 'Nitro Enclavesa', link: '/nitro-enclavesa' },
        ]
      },
      // { text: 'Lightsail', link: '/aws/compute/lightsail' },
      { 
        text: 'Lambda',
        collapsed: true,
        base: 'th/aws/compute/lambda', 
        link: '/lambda', 
        items: [
          { text: 'Serverless', link: '/serverless' },
          { text: 'Synchronous Invocations', link: '/synchronous-invocations' },
          { text: 'Lambda Integration with ALB', link: '/lambda-integration-with-alb' },
          { text: 'Asynchronous Invocations', link: '/asynchronous-invocations' },
          { text: 'Lambda & CloudWatch Events / EventBridge', link: '/lambda-and-cloudwatch-events-eventbridge' },
          { text: 'S3 Events Notifications', link: '/s3-events-notifications' }, 
          { text: 'Event Source Mapping', link: '/event-source-mapping' },
          { text: 'Event and Context Objects', link: '/event-and-context-objects' },
          { text: 'Destinations', link: '/destinations' },
          { text: 'Permissions', link: '/permissions' },
          { text: 'Environment', link: '/environment' },
          { text: 'Logging & Monitoring', link: '/logging-and-monitoring' },
          { text: 'Edge', link: '/edge' },
          { text: 'Lambda in VPC', link: '/lambda-in-vpc' },
          { text: 'Function Configuration', link: '/function-configuration' },
          { text: 'Layers', link: '/layers' },
          { text: 'File Systems Mounting', link: '/file-systems-mounting' },
          { text: 'Concurrency', link: '/concurrency' },
          { text: 'Dependencies', link: '/dependencies' },
          { text: 'Lambda and CloudFormation', link: '/lambda-and-cloudformation' },
          { text: 'Container Images', link: '/container-images' },
          { text: 'Versions', link: '/versions' },
          { text: 'CodeDeploy', link: '/codedeploy' },
          { text: 'Function URL', link: '/function-url' },
          { text: 'CodeGuruL', link: '/codeguru' },
          { text: 'Limits', link: '/limits' },
          { text: 'Best Practices', link: '/best-practices' },
        ]
      },
      // { text: 'Batch', link: '/aws/compute/batch' },
      { 
        text: 'Elastic Beanstalk', 
        collapsed: true,
        base: 'th/aws/compute/beanstalk', 
        link: '/elastic-beanstalk', 
        items: [
          { text: 'Beanstalk Deployment Modes', link: '/beanstalk-deployment-modes' },
          { text: 'Elastic Beanstalk CLI', link: '/cli' },
          { text: 'Beanstalk Lifecycle Policy', link: '/beanstalk-lifecycle-policy' },
          { text: 'Elastic Beanstalk Extensions', link: '/elastic-beanstalk-extensions' },
          { text: 'Beanstalk & CloudFormation', link: '/beanstalk-cloudFormation' },
          { text: 'Beanstalk Cloning', link: '/beanstalk-cloning' },
          { text: 'Beanstalk Migrations', link: '/beanstalk-migrations' },
        ]
      },
      { text: 'Serverless Application', link: 'th/aws/compute/serverless-application' },
      // { text: 'AWS Outposts', link: '/aws/compute/aws-outposts' },
      // { text: 'EC2 Image Builder', link: '/aws/compute/ec2-image-builder' },
      // { text: 'AWS App Runner', link: '/aws/compute/aws-app-runner' },
      // { text: 'AWS SimSpace Weaver', link: '/aws/compute/aws-simspace-weaver' },
      // { text: 'Parallel Computing Service', link: '/aws/compute/parallel-computing-service' },
      // { text: 'EC2 Global View', link: '/aws/compute/ec2-global-view' },
    ]
  },
  {
    text: 'Containers',
    link: 'th/aws/containers/containers',
    collapsed: true,
    items: [
      { 
        text: 'Elastic Container Service', 
        collapsed: true,
        base: 'th/aws/containers/ecs', 
        link: '/ecs', 
        items: [
          { text: 'ECS Cluster', link: '/ecs-cluster' },
          { text: 'ECS Service', link: '/ecs-service' },
          { text: 'ECS Auto Scaling', link: '/ecs-auto-scaling' },
          { text: 'ECS Rolling Updates', link: '/ecs-rolling-updates' },
          { text: 'ECS Solutions Architectures', link: '/ecs-solutions-architectures' },
          { text: 'ECS Task Definitions', link: '/ecs-task-definitions' },
          { text: 'ECS Task Placement', link: '/ecs-task-placement' },
          
        ]
      },
      { text: 'Elastic Container Registry', link: 'th/aws/containers/elastic-container-registry' },
      { text: 'Copilot', link: 'th/aws/containers/copilot' },
      { text: 'Elastic Kubernetes Service', link: 'th/aws/containers/elastic-kubernetes-service' },
      // { text: 'Red Hat OpenShift Service on AWS', link: 'th/aws/containers/red-hat-openshift-service-on-aws' },
      
    ]
  },
  {
    text: "Storage",
    link: '/th/aws/storage/storage',
    collapsed: true,
    items: [
      { 
        text: 'S3', 
        collapsed: true,
        base: '/th/aws/storage/s3',
        link: '/s3',
        items: [
          { text: 'Bucket Policies', link: '/bucket-policies' },
          { text: 'Static Website Hosting', link: '/static-website-hosting' },
          { text: 'Versioning', link: '/versioning' },
          { text: 'Replication', link: '/replication' },
          { text: 'Storage Classes', link: '/storage-classes' },
          { text: 'Lifecycle', link: '/lifecycle', },
          { text: 'Event Notifications', link: '/event-notifications', },
          { text: 'Performance', link: '/performance', },
          { text: 'Metadata & S3 Object Tags', link: '/metadata-&-object-tags', },
          { text: 'Encryption', link: '/encryption', },
          { text: 'CORS', link: '/cors', },
          { text: 'MFA Delete', link: '/mfa-delete', },
          { text: 'Access Logs', link: '/access-logs', },
          { text: 'Pre-Signed URLs', link: '/pre-signed-urls', },
          { text: 'Access Points', link: '/access-points', },
          { text: 'S3 Object Lambda', link: '/object-lambda', },
        ]
      },
      { 
        text: 'EFS', 
        collapsed: true,
        link: 'th/aws/storage/efs', 
      },
      // { text: 'FSx', link: '/aws/storage/fsx' },
      // { text: 'S3 Glacier', link: '/aws/storage/s3-glacier' },
      // { text: 'Storage Gateway', link: '/aws/storage/storage-gateway' },
      // { text: 'AWS Backup', link: '/aws/storage/aws-backup' },
      // { text: 'AWS Elastic Disaster Recovery', link: '/aws/storage/aws-elastic-disaster-recovery' },
    ]
  },
  {
    text: "Database",
    link: 'th/aws/database/database',
    collapsed: true,
    items: [
      { text: 'Aurora and RDS', link: 'th/aws/database/aurora-and-rds' },
      { text: 'ElastiCache', link: 'th/aws/database/elasticache' },
      // { text: 'Neptune', link: '/aws/database/neptune' },
      // { text: 'Amazon QLDB', link: '/aws/database/amazon-qldb' },
      // { text: 'Amazon DocumentDB', link: '/aws/database/amazon-documentdb' },
      // { text: 'Amazon Keyspaces', link: '/aws/database/amazon-keyspaces' },
      // { text: 'Amazon Timestream', link: '/aws/database/amazon-timestream' },
      { 
        text: 'DynamoDB', 
        collapsed: true,
        base: 'th/aws/database/dynamodb',
        link: '/dynamodb', 
        items: [
          { text: 'Read/Write Capacity Modes', link: '/read-and-write-capacity-modes' }, 
          { text: 'Basic Operations', link: '/basic-operations' },
          { text: 'Basic APIs ', link: '/basic-apis' },
          { text: 'Conditional Writes', link: '/conditional-writes' },  
          { text: 'GSI + LSI', link: '/gsi-lsi' },
          { text: 'PartiQL', link: '/partiql' },
          { text: 'Optimistic Locking', link: '/optimistic-locking' },
          { text: 'DAX', link: '/dax' },
          { text: 'Streams', link: '/streams' },
          { text: 'TTL', link: '/ttl' },
          { text: 'CLI', link: '/cli' },
          { text: 'Transactions', link: '/transactions' },
          { text: 'Session State', link: '/session-state' },
          { text: 'Write Sharding', link: '/write-sharding' },
          { text: 'Write Operations', link: '/write-operation' }, 
          { text: 'Patterns with S3', link: '/patterns-with-s3' }, 
          { text: 'Operations', link: '/operations' }, 
          { text: 'Security & Other Features', link: '/security-and-other-features' }, 
        ]
      },
      // { text: 'Aurora DSQL', link: '/aws/database/aurora-dsql' },
      // { text: 'Amazon MemoryDB', link: '/aws/database/amazon-memorydb' },
      // { text: 'Oracle Database@AWS', link: '/aws/database/oracle-database-aws' },
    ]              
  },
  // {
  //   text: "Migration & Transfer",
  //   collapsed: true,
  //   items: [
  //     { text: 'Migration & Transfer', link: '/aws/migration-&-transfer/migration-&-transfer' },
  //     { text: 'AWS Migration Hub', link: '/aws/migration-&-transfer/aws-migration-hub' },
  //     { text: 'AWS Application Migration Service', link: '/aws/migration-&-transfer/aws-application-migration-service' },
  //     { text: 'Application Discovery Service', link: '/aws/migration-&-transfer/application-discovery-service' },
  //     { text: 'Database Migration Service', link: '/aws/migration-&-transfer/database-migration-service' },
  //     { text: 'AWS Transfer Family', link: '/aws/migration-&-transfer/aws-transfer-family' },
  //     { text: 'AWS Snow Family', link: '/aws/migration-&-transfer/aws-snow-family' },
  //     { text: 'DataSync', link: '/aws/migration-&-transfer/datasync' },
  //     { text: 'AWS Mainframe Modernization', link: '/aws/migration-&-transfer/aws-mainframe-modernization' },
  //     { text: 'Amazon Elastic VMware Service (Preview)', link: '/aws/migration-&-transfer/amazon-elastic-vmware-service' },
  //   ]
  // },
  {
    text: "Developer Tools",
    link: 'th/aws/developer-tools/developer-tools',
    collapsed: true,
    items: [
      { text: 'CodeCommit', link: 'th/aws/developer-tools/codecommit' },
      { 
        text: 'CodeBuild', 
        collapsed: true,
        base: 'th/aws/developer-tools/codebuild',
        link: '/codebuild', 
        items: [
          { text: 'CodeBuild Security', link: '/codebuild-security' },
        ]
      },
      { text: 'CodeDeploy', link: 'th/aws/developer-tools/codedeploy' },
      { text: 'CodePipeline', link: 'th/aws/developer-tools/codepipeline' },
      // { text: 'Cloud9', link: '/aws/developer-tools/cloud9' },
      // { text: 'CloudShell', link: '/aws/developer-tools/cloudshell' },
      { 
        text: 'X-Ray', 
        collapsed: true,
        base: 'th/aws/developer-tools/x-ray',
        link: '/x-ray', 
        items: [
          { text: 'Instrumentation & Concepts', link: '/instrumentation-and-concepts' }, 
          { text: 'Sampling Rules', link: '/samplingrules' }, 
          { text: 'APIs', link: '/apis' },
          { text: 'X-Ray with Elastic Beanstalk', link: '/x-ray-with-elastic-beanstalk' },
          { text: 'X-Ray with ECS', link: '/x-ray-with-ecs' },
          { text: 'Distro for OpenTelemetrCloudy', link: '/distro-for-opentelemetry' }
        ]
      },
      { 
        text: 'CDK', 
        collapsed: true,
        base: 'th/aws/developer-tools/cdk',
        link: '/cdk', 
        items: [
          { text: 'CDK Constructs', link: '/cdk-constructs' }, 
          { text: 'Commands & Bootstrapping', link: '/commands-bootstrapping' },
          { text: 'Testing', link: '/testing' },
        ]
      },      
      // { text: 'AWS FIS', link: '/aws/developer-tools/aws-fis' },
      // { text: 'Infrastructure Composer', link: '/aws/developer-tools/infrastructure-composer' },
      // { text: 'AWS App Studio', link: '/aws/developer-tools/aws-app-studio' },
      { text: 'AWS AppConfig', link: 'th/aws/developer-tools/aws-appconfig' },
      { text: 'CodeArtifact', link: 'th/aws/developer-tools/codeartifact' },
      // { text: 'Amazon CodeCatalyst', link: '/aws/developer-tools/amazon-codecatalyst' },
      // { text: 'Amazon Q Developer', link: '/aws/developer-tools/amazon-q-developer' },
    ]
  },
  // {
  //   text: "Customer Enablement",
  //   collapsed: true,
  //   items: [
  //     { text: 'Customer Enablement', link: '/aws/customer-enablement/customer-enablement' },
  //     { text: 'AWS IQ', link: '/aws/customer-enablement/aws-iq' },
  //     { text: 'Managed Services', link: '/aws/customer-enablement/managed-services' },
  //     { text: 'Activate for Startups', link: '/aws/customer-enablement/activate-for-startups' },
  //     { text: 'AWS re:Post Private', link: '/aws/customer-enablement/aws-re-post-private' },
  //     { text: 'Support', link: '/aws/customer-enablement/support' },
  //   ]
  // },
  // {
  //   text: "Robotics",
  //   collapsed: true,
  //   items: [
  //     { text: 'Robotics', link: '/aws/robotics/robotics' },
  //     { text: 'AWS RoboMaker', link: '/aws/robotics/aws-robomaker' },
  //   ]
  // },
  // {
  //   text: "Blockchain",
  //   collapsed: true,
  //   items: [
  //     { text: 'Blockchain', link: '/aws/blockchain/blockchain' },
  //     { text: 'Amazon Managed Blockchain', link: '/aws/blockchain/amazon-managed-blockchain' },
  //   ]
  // },
  // {
  //   text: "Satellite",
  //   collapsed: true,
  //   items: [
  //     { text: 'Satellite', link: '/aws/satellite/satellite' },
  //     { text: 'Ground Station', link: '/aws/satellite/ground-station' },
  //   ]
  // },    
  // {
  //   text: "Quantum Technologies",
  //   collapsed: true,
  //   items: [
  //     { text: 'Quantum Technologies', link: '/aws/quantum-technologies/quantum-technologies' },
  //     { text: 'Amazon Braket', link: '/aws/quantum-technologies/amazon-braket' },
  //   ]
  // },    
  {
    text: "Management & Governance",
    collapsed: true,
    items: [
      // { text: 'Management & Governance', link: '/aws/management-&-governance/management-&-governance' },
      // { text: 'AWS Organizations', link: '/aws/management-&-governance/aws-organizations' },
      { 
        text: 'CloudWatch', 
        collapsed: true,
        base: 'th/aws/management-&-governance/cloudwatch',
        link: '/cloudwatch', 
        items: [
          { text: 'Metrics', link: '/metrics' },
          { text: 'Logs', link: '/logs' },
          { text: 'Logs - Encryption', link: '/logs-encryption' },
          { text: 'Alarms', link: '/alarms' },
          { text: 'Synthetics', link: '/synthetics' },
          { text: 'Evidently', link: '/evidently' },
        ]
      },
      // { text: 'AWS Auto Scaling', link: '/aws/management-&-governance/aws-auto-scaling' },
      { 
        text: 'CloudFormation', 
        collapsed: true,
        base: 'th/aws/management-&-governance/cloudformation',
        link: '/cloudformation',
        items: [
          { text: 'YAML', link: '/yaml' },
          { text: 'Resources', link: '/resources' },
          { text: 'Parameters', link: '/parameters' },
          { text: 'Mappings', link: '/mappings' },
          { text: 'Outputs', link: '/outputs' },
          { text: 'Condition', link: '/condition' },
          { text: 'Intrinsic Functions', link: '/intrinsic-functions' },
          { text: 'Rollbacks', link: '/rollbacks' },
          { text: 'Service Role', link: '/service-role' },
          { text: 'Capabilities', link: '/capabilities' },
          { text: 'DeletionPolicy', link: '/deletionPolicy' },
          { text: 'Stack Policies', link: '/stack-policies' },
          { text: 'Termination Protection', link: '/termination-protection' },
          { text: 'Custom Resources', link: '/custom-resources' },
          { text: 'StackSets', link: '/stackSets' },
          {text: 'Dynamic References', link: '/dynamic-feferences'  }
        ]
      },
      // { text: 'AWS Config', link: '/aws/management-&-governance/aws-config' },
      // { text: 'OpsWorks', link: '/aws/management-&-governance/opsworks' },
      // { text: 'Service Catalog', link: '/aws/management-&-governance/service-catalog' },
      { 
        text: 'Systems Manager', 
        collapsed: true,
        base: 'th/aws/management-&-governance/system-manager',
        link: '/systems-manager',
        items: [
          { text: 'SSM Parameter Store', link: '/ssm-parameter-store' },
        ]
      },
      // { text: 'Trusted Advisor', link: '/aws/management-&-governance/trusted -advisor' },
      // { text: 'Control Tower', link: '/aws/management-&-governance/control-tower' },
      // { text: 'AWS Well-Architected Tool', link: '/aws/management-&-governance/aws-well-architected-tool' },
      // { text: 'Amazon Q Developer in chat applications', link: '/aws/management-&-governance/amazon-q-developer-in-chat-applications' },
      // { text: 'Launch Wizard', link: '/aws/management-&-governance/launch-wizard' },
      // { text: 'AWS Compute Optimizer', link: '/aws/management-&-governance/aws-compute-optimizer' },
      // { text: 'Resource Groups & Tag Editor', link: '/aws/management-&-governance/resource-groups-&-tag-editor' },
      // { text: 'Amazon Grafana', link: '/aws/management-&-governance/amazon-grafana' },
      // { text: 'Amazon Prometheus', link: '/aws/management-&-governance/amazon-prometheus' },
      // { text: 'AWS Resilience Hub', link: '/aws/management-&-governance/aws-resilience-hub' },
      // { text: 'Incident Manager', link: '/aws/management-&-governance/incident-manager' },
      // { text: 'AWS Telco Network Builder', link: '/aws/management-&-governance/aws-telco-network-builder' },
      // { text: 'AWS Health Dashboard', link: '/aws/management-&-governance/aws-health-dashboard' },
      // { text: 'AWS Proton', link: '/aws/management-&-governance/aws-proton' },
      // { text: 'AWS User Notifications', link: '/aws/management-&-governance/aws-user-notifications' },
      { 
        text: 'CloudTrail', 
        collapsed: true,
        base: 'th/aws/management-&-governance/cloudtrail',
        link: '/cloudtrail',
        items: [
          { text: 'CloudTrail EventBridge', link: '/cloudtrail-eventbridge' },
          { text: 'CloudTrail vs CloudWatch vs X-Ray', link: '/cloudtrail-vs-cloudwatch-vs-x-ray' },
          
        ]
      },
      // { text: 'AWS License Manager', link: '/aws/management-&-governance/aws-license-manager' },
      // { text: 'AWS Resource Explorer', link: '/aws/management-&-governance/aws-resource-explorer' },
      // { text: 'Service Quotas', link: '/aws/management-&-governance/service-quotas' },
    ]
  },      
  // {
  //   text: "Media Services",
  //   collapsed: true,
  //   items: [
  //     { text: 'Media Services', link: '/aws/media-services/media-services' },
  //     { text: 'Kinesis Video Streams', link: '/aws/media-services/kinesis-video-streams' },
  //     { text: 'MediaConvert', link: '/aws/media-services/mediaconvert' },
  //     { text: 'MediaLive', link: '/aws/media-services/medialive' },
  //     { text: 'MediaPackage', link: '/aws/media-services/mediapackage' },
  //     { text: 'MediaStore', link: '/aws/media-services/mediastore' },
  //     { text: 'MediaTailor', link: '/aws/media-services/mediatailor' },
  //     { text: 'Elemental Appliances & Software', link: '/aws/media-services/elemental-appliances-&-software' },
  //     { text: 'Elastic Transcoder', link: '/aws/media-services/elastic-transcoder' },
  //     { text: 'Amazon Interactive Video Service', link: '/aws/media-services/amazon-interactive-video-service' },
  //     { text: 'AWS Deadline Cloud', link: '/aws/media-services/aws-deadline-cloud' },
  //     { text: 'MediaConnect', link: '/aws/media-services/mediaconnect' },
  //   ]
  // },  
  {
    text: "Machine Learning",
    collapsed: true,
    items: [
      // { text: 'Machine Learning', link: '/aws/machine-learning/machine-learning' },
      // { text: 'Amazon SageMaker AI', link: '/aws/machine-learning/amazon-sagemaker-ai' },
      // { text: 'Amazon Augmented AI', link: '/aws/machine-learning/amazon-augmented-ai' },
      { text: 'Amazon CodeGuru', link: 'th/aws/machine-learning/amazon-codeguru' },
      // { text: 'Amazon DevOps Guru', link: '/aws/machine-learning/amazon-devops-guru' },
      // { text: 'Amazon Comprehend', link: '/aws/machine-learning/amazon-comprehend' },
      // { text: 'Amazon Forecast', link: '/aws/machine-learning/amazon-forecast' },
      // { text: 'Amazon Fraud Detector', link: '/aws/machine-learning/amazon-fraud-detector' },
      // { text: 'Amazon Kendra', link: '/aws/machine-learning/amazon-kendra' },
      // { text: 'Amazon Personalize', link: '/aws/machine-learning/amazon-personalize' },
      // { text: 'Amazon Polly', link: '/aws/machine-learning/amazon-polly' },
      // { text: 'Amazon Rekognition', link: '/aws/machine-learning/amazon-rekognition' },
      // { text: 'Amazon Textract', link: '/aws/machine-learning/amazon-textract' },
      // { text: 'Amazon Transcribe', link: '/aws/machine-learning/amazon-transcribe' },
      // { text: 'Amazon Translate', link: '/aws/machine-learning/amazon-translate' },
      // { text: 'AWS DeepComposer', link: '/aws/machine-learning/aws-deepcomposer' },
      // { text: 'AWS DeepRacer', link: '/aws/machine-learning/aws-deepracer' },
      // { text: 'AWS Panorama', link: '/aws/machine-learning/aws-panorama' },
      // { text: 'Amazon Monitron', link: '/aws/machine-learning/amazon-monitron' },
      // { text: 'AWS HealthLake', link: '/aws/machine-learning/aws-healthlake' },
      // { text: 'Amazon Lookout for Vision', link: '/aws/machine-learning/amazon-lookout-for-vision' },
      // { text: 'Amazon Lookout for Equipment', link: '/aws/machine-learning/amazon-lookout-for-equipment' },
      // { text: 'Amazon Lookout for Metrics', link: '/aws/machine-learning/amazon-lookout-for-metrics' },
      // { text: 'Amazon Q Business', link: '/aws/machine-learning/amazon-q-business' },
      // { text: 'AWS HealthOmics', link: '/aws/machine-learning/aws-healthomics' },
      // { text: 'Amazon Bedrock', link: '/aws/machine-learning/amazon-bedrock' },
      // { text: 'Amazon Q', link: '/aws/machine-learning/amazon-q' },
      // { text: 'Amazon Comprehend Medical', link: '/aws/machine-learning/amazon-comprehend-medical' },
      // { text: 'Amazon Lex', link: '/aws/machine-learning/amazon-lex' },
      // { text: 'AWS HealthImaging', link: '/aws/machine-learning/aws-healthimaging' },
    ]
  },  
  {
    text: "Analytics",
    link: 'th/aws/analytics/analytics',
    collapsed: true,
    items: [
      { text: 'Athena', link: 'th/aws/analytics/athena' },
      // { text: 'Amazon Redshift', link: '/aws/analytics/amazon-redshift' },
      // { text: 'CloudSearch', link: '/aws/analytics/cloudsearch' },
      { text: 'Amazon OpenSearch Service', link: 'th/aws/analytics/amazon-opensearch-service' },
      { text: 'Kinesis', link: 'th/aws/analytics/kinesis' },
      // { text: 'QuickSight', link: '/aws/analytics/quicksight' },
      // { text: 'AWS Data Exchange', link: '/aws/analytics/aws-data-exchange' },
      // { text: 'AWS Lake Formation', link: '/aws/analytics/aws-lake-formation' },
      { text: 'MSK', link: 'th/aws/analytics/msk' },
      // { text: 'AWS Glue DataBrew', link: '/aws/analytics/aws-glue-databrew' },
      // { text: 'Amazon FinSpace', link: '/aws/analytics/amazon-finspace' },
      { text: 'Managed Apache Flink', link: 'th/aws/analytics/managed-apache-flink' },
      // { text: 'EMR', link: '/aws/analytics/emr' },
      // { text: 'AWS Clean Rooms', link: '/aws/analytics/aws-clean-rooms' },
      // { text: 'Amazon SageMaker', link: '/aws/analytics/amazon-sagemaker' },
      // { text: 'AWS Entity Resolution', link: '/aws/analytics/aws-entity-resolution' },
      // { text: 'AWS Glue', link: '/aws/analytics/aws-glue' },
      { text: 'Amazon Data Firehose', link: 'th/aws/analytics/amazon-data-firehose' },
      // { text: 'Amazon DataZone', link: '/aws/analytics/amazon-datazone' },
    ]
  },  
  {
    text: "Security, Identity, & Compliance",
    collapsed: true,
    items: [
      // { text: 'Security, Identity, & Compliance', link: '/aws/security-identity-&-compliance/security-identity-&-compliance' },
      // { text: 'Resource Access Manager', link: '/aws/security-identity-&-compliance/resource-access-manager' },
      { 
        text: 'Cognito', 
        collapsed: true,
        base: 'th/aws/security-identity-&-compliance/cognito', 
        link: '/cognito', 
        items: [
           { text: 'User Pools', link: '/user-pools' }, 
           { text: 'ALB Auth Users', link: '/alb-auth-users' },
           { text: 'Identity Pools', link: '/identity-pools' },
        ]
      },
      { text: 'Secrets Manager', link: 'th/aws/security-identity-&-compliance/secrets-manager' },
      // { text: 'GuardDuty', link: '/aws/security-identity-&-compliance/guardduty' },
      // { text: 'Amazon Inspector', link: '/aws/security-identity-&-compliance/amazon-inspector' },
      { text: 'Amazon Macie', link: 'th/aws/security-identity-&-compliance/amazon-macie' },
      { 
        text: 'IAM Identity Center', 
        collapsed: true,
        base: 'th/aws/security-identity-&-compliance/iam-identity-center', 
        link: '/iam-identity-center', 
        items: [
          { text: 'STS', link: '/sts' }
        ]
      },
      { text: 'Certificate Manager', link: 'th/aws/security-identity-&-compliance/certificate-manager' },
      { text: 'Encryption', link: 'th/aws/security-identity-&-compliance/encryption' },
      { 
        text: 'Key Management Service', 
        collapsed: true,
        base: 'th/aws/security-identity-&-compliance/kms', 
        link: '/key-management-service', 
        items: [
          { text: 'Encrypt and Decrypt', link: '/encrypt-and-decrypt' }, 
          { text: 'KMS Limits', link: '/kms-limits' },
          { text: 'KMS Lambda', link: '/kms-and-lambda' },
          { text: 'KMS S3 Bucket', link: '/kms-s3-bucket' },
          { text: 'KMS Key Policies & IAM', link: '/kms-key-policies-iam' },
        ]
      },
      { text: 'CloudHSM', link: 'th/aws/security-identity-&-compliance/cloudhsm' },
      { text: 'Directory Service', link: 'th/aws/security-identity-&-compliance/directory-service' },
      // { text: 'AWS Firewall Manager', link: '/aws/security-identity-&-compliance/aws-firewall-manager' },
      // { text: 'AWS Artifact', link: '/aws/security-identity-&-compliance/aws-artifact' },
      // { text: 'Detective', link: '/aws/security-identity-&-compliance/detective' },
      // { text: 'AWS Signer', link: '/aws/security-identity-&-compliance/aws-signer' },
      // { text: 'Security Lake', link: '/aws/security-identity-&-compliance/security-lake' },
      // { text: 'WAF & Shield', link: '/aws/security-identity-&-compliance/waf-&-shield' },
      // { text: 'Amazon Verified Permissions', link: '/aws/security-identity-&-compliance/amazon-verified-permissions' },
      // { text: 'AWS Audit Manager', link: '/aws/security-identity-&-compliance/aws-audit-manager' },
      // { text: 'Security Hub', link: '/aws/security-identity-&-compliance/security-hub' },
      { 
        text: 'IAM', 
        collapsed: true,
        base: 'th/aws/security-identity-&-compliance/IAM',
        link: '/iam',
        items: [
          { text: 'IAM Policies', link: '/iam-policies' }, 
          { text: 'IAM MFA', link: '/iam-mfa' }, 
          { text: 'AWS Access', link: '/aws-access' }, 
          { text: 'IAM Roles', link: '/iam-roles' }, 
          { text: 'IAM Security Tools', link: '/iam-security-tools' },
          { text: 'IAM Best Practices', link: '/iam-best-practices' },
          { text: 'Shared Responsibility Model for IAM', link: '/shared-responsibility-model-for-iam' },
          { text: 'IAM Summary', link: '/iam-summary' },
          { text: 'Advanced IAM', link: '/advanced-iam' },
          { text: 'Pass Role', link: '/pass-role' },
        ]
      },
      // { text: 'AWS Private Certificate Authority', link: '/aws/security-identity-&-compliance/aws-private-certificate-authority' },
      // { text: 'AWS Payment Cryptography', link: '/aws/security-identity-&-compliance/aws-payment-cryptography' },
      // { text: 'AWS Security Incident Response', link: '/aws/security-identity-&-compliance/aws-security-incident-response' },
    ]
  },  
  {
    text: "Cloud Financial Management",
    collapsed: true,
    items: [
      // { text: 'Cloud Financial Management', link: '/aws/cloud-financial-management/cloud-financial-management' },
      // { text: 'AWS Marketplace', link: '/aws/cloud-financial-management/aws-marketplace' },
      // { text: 'AWS Billing Conductor', link: '/aws/cloud-financial-management/aws-billing-conductor' },
      { 
        text: 'Billing and Cost Management', 
        base: 'th/aws/cloud-financial-management/billing-and-cost-management',
        link: '/billing-and-cost-management', 
        items: [
          { text: 'AWS Budget', link: '/aws-buget' }, 
        ]
      },
    ]
  },     
  {
    text: "Front-end Web & Mobile",
    collapsed: true,
    items: [
      // { text: 'Front-end Web & Mobile', link: '/aws/front-end-web-&-mobile/front-end-web-&-mobile' },
      { text: 'AWS Amplify', link: 'th/aws/front-end-web-&-mobile/aws-amplify' },
      { text: 'AWS AppSync', link: 'th/aws/front-end-web-&-mobile/aws-appsync' },
      // { text: 'Device Farm', link: '/aws/front-end-web-&-mobile/device-farm' },
      // { text: 'Amazon Location Service', link: '/aws/front-end-web-&-mobile/amazon-location-service' },
    ]
  },  
  {
    text: "Application Integration",
    collapsed: true,
    items: [
      { text: 'Application Integration', link: 'th/aws/application-integration/application-integration' },
      { 
        text: 'Step Functions', 
        collapsed: true,
        base: 'th/aws/application-integration/step-functions',
        link: '/step-functions', 
        items: [
          { text: 'Error Handling', link: '/error-handling' },
          { text: 'Wait for Task Token', link: '/wait-for-task-token' },
          { text: 'Activity Tasks', link: '/activity-tasks' },
          { text: 'Standard vs. Express', link: '/standard-vs-express' },
        ]
      },
      // { text: 'Amazon AppFlow', link: '/aws/application-integration/amazon-appflow' },
      // { text: 'Amazon MQ', link: '/aws/application-integration/amazon-mq' },
      { text: 'Simple Notification Service', link: 'th/aws/application-integration/simple-notification-service' },
      { 
        text: 'Simple Queue Service', 
        collapsed: true,
        base: 'th/aws/application-integration/sqs',
        link: '/simple-queue-service',
        items: [
          { text: 'Access Policy', link: '/access-policy' }, 
          { text: 'Message Visibility Timeout', link: '/message-visibility-timeout' }, 
          { text: 'Dead Letter Queue', link: '/dead-letter-queue' }, 
          { text: 'Delay Queue', link: '/delay-queue' }, 
          { text: 'FIFO Queue', link: '/fifo-queue' }, 
          { text: 'Certified Developer Concepts', link: '/certified-developer-concepts' }, 
        ]
      },
      // { text: 'SWF', link: '/aws/application-integration/swf' },
      // { text: 'Managed Apache Airflow', link: '/aws/application-integration/managed-apache-airflow' },
      // { text: 'AWS B2B Data Interchange', link: '/aws/application-integration/aws-b2b-data-interchange' },
      { text: 'Amazon EventBridge', link: 'th/aws/application-integration/amazon-eventbridge' },
    ]
  }, 
  {
    text: "Business Applications",
    collapsed: true,
    items: [
      // { text: 'Business Applications', link: '/aws/business-applications/business-applications' },
      // { text: 'Amazon Connect', link: '/aws/business-applications/amazon-connect' },
      // { text: 'Amazon Chime', link: '/aws/business-applications/amazon-chime' },
      { text: 'Amazon Simple Email Service', link: 'th/aws/business-applications/amazon-simple-email-service' },
      // { text: 'Amazon WorkDocs', link: '/aws/business-applications/amazon-workdocs' },
      // { text: 'Amazon WorkMail', link: '/aws/business-applications/amazon-workmail' },
      // { text: 'AWS Supply Chain', link: '/aws/business-applications/aws-supply-chain' },
      // { text: 'Amazon Pinpoint', link: '/aws/business-applications/amazon-pinpoint' },
      // { text: 'Amazon One Enterprise', link: '/aws/business-applications/amazon-one-enterprise' },
      // { text: 'AWS Wickr', link: '/aws/business-applications/aws-wickr' },
      // { text: 'AWS AppFabric', link: '/aws/business-applications/aws-appfabric' },
      // { text: 'AWS End User Messaging', link: '/aws/business-applications/aws-end-user-messaging' },
      // { text: 'Amazon Chime SDK', link: '/aws/business-applications/amazon-chime-sdk' },
    ]
  },  
  // {
  //   text: "End User Computing",
  //   collapsed: true,
  //   items: [
  //     { text: 'End User Computing', link: '/aws/end-user-computing/end-user-computing' },
  //     { text: 'WorkSpaces', link: '/aws/end-user-computing/workspaces' },
  //     { text: 'AppStream 2.0', link: '/aws/end-user-computing/appstream' },
  //     { text: 'WorkSpaces Thin Client', link: '/aws/end-user-computing/workspaces-thin-client' },
  //     { text: 'WorkSpaces Secure Browser', link: '/aws/end-user-computing/workspaces-secure-browser' },
  //   ]
  // },  
  // {
  //   text: "Internet of Things",
  //   collapsed: true,
  //   items: [
  //     { text: 'Internet of Things', link: '/aws/internet-of-things/internet-of-things' },
  //     { text: 'IoT Analytics', link: '/aws/internet-of-things/iot-analytics' },
  //     { text: 'IoT Device Defender', link: '/aws/internet-of-things/iot-device-defender' },
  //     { text: 'IoT Device Management', link: '/aws/internet-of-things/iot-device-management' },
  //     { text: 'IoT Greengrass', link: '/aws/internet-of-things/iot-greengrass' },
  //     { text: 'IoT SiteWise', link: '/aws/internet-of-things/iot-sitewise' },
  //     { text: 'IoT Core', link: '/aws/internet-of-things/iot-core' },
  //     { text: 'IoT TwinMaker', link: '/aws/internet-of-things/iot-twinmaker' },
  //     { text: 'IoT Events', link: '/aws/internet-of-things/iot-events' },
  //     { text: 'AWS IoT FleetWise', link: '/aws/internet-of-things/aws-iot-fleetwise' },
  //   ]
  // },  
  // {
  //   text: "Game Development",
  //   collapsed: true,
  //   items: [
  //     { text: 'Game Development', link: '/aws/game-development/game-development' },
  //     { text: 'Amazon GameLift Servers', link: '/aws/game-development/amazon-gamelift-servers' },
  //     { text: 'Amazon GameLift Streams', link: '/aws/game-development/amazon-gamelift-streams' },
  //   ]
  // }, 
  {
    text: "my-docs",
    collapsed: true,
    items: [
      {
        text: "analytics-services",
        collapsed: true,
        base: 'th/aws/my-docs/analytics-services',
        items: [
            { text: "amazon-appflow", "link": "/amazon-appflow" },
            { text: "amazon-athena", "link": "/amazon-athena" },
            { text: "amazon-cloudsearch", "link": "/amazon-cloudsearch" },
            { text: "amazon-emr", "link": "/amazon-emr" },
            { text: "amazon-kinesis", "link": "/amazon-kinesis" },
            { text: "amazon-managed-streaming-for-apache-kafka-amazon-msk", "link": "/amazon-managed-streaming-for-apache-kafka-amazon-msk" },
            { text: "amazon-opensearch-service", "link": "/amazon-opensearch-service" },
            { text: "amazon-quicksight", "link": "/amazon-quicksight" },
            { text: "amazon-redshift", "link": "/amazon-redshift" },
            { text: "aws-data-exchange", "link": "/aws-data-exchange" },
            { text: "aws-data-pipeline", "link": "/aws-data-pipeline" },
            { text: "aws-entity-resolution", "link": "/aws-entity-resolution" },
            { text: "aws-glue-data-quality", "link": "/aws-glue-data-quality" },
            { text: "aws-glue-databrew", "link": "/aws-glue-databrew" },
            { text: "aws-glue", "link": "/aws-glue" },
            { text: "aws-lake-formation", "link": "/aws-lake-formation" }
          ]
      },
      {
        text: "application-services",
        collapsed: true,
        base: 'th/aws/my-docs/application-services',
        items: [
            { text: "amazon-appflow", "link": "/amazon-appflow" },
            { text: "amazon-eventbridge", "link": "/amazon-eventbridge" },
            { text: "amazon-managed-workflows-for-apache-airflow", "link": "/amazon-managed-workflows-for-apache-airflow" },
            { text: "amazon-ses", "link": "/amazon-ses" },
            { text: "amazon-simple-workflow-amazon-swf", "link": "/amazon-simple-workflow-amazon-swf" },
            { text: "amazon-sns", "link": "/amazon-sns" },
            { text: "amazon-sqs", "link": "/amazon-sqs" },
            { text: "aws-step-functions", "link": "/aws-step-functions" }
          ]
      },
      {
        text: "aws-billing-and-cost-management",
        collapsed: true,
        base: 'th/aws/my-docs/aws-billing-and-cost-management',
        items: [
            { text: "aws-billing-and-cost-management", "link": "/aws-billing-and-cost-management" }
          ]
      },
      {
        text: "comparison",
        collapsed: true,
        base: 'th/aws/my-docs/comparison',
        items: [
            { text: "amazon-aurora-vs-amazon-rds", "link": "/amazon-aurora-vs-amazon-rds" },
            { text: "amazon-cognito-user-pools-vs-identity-pools", "link": "/amazon-cognito-user-pools-vs-identity-pools" },
            { text: "amazon-efs-vs-amazon-fsx-for-windows-vs-amazon-fsx-for-lustre", "link": "/amazon-efs-vs-amazon-fsx-for-windows-vs-amazon-fsx-for-lustre" },
            { text: "amazon-eks-vs-amazon-ecs", "link": "/amazon-eks-vs-amazon-ecs" },
            { text: "amazon-kinesis-data-streams-vs-data-firehose-vs-data-analytics-vs-video-streams", "link": "/amazon-kinesis-data-streams-vs-data-firehose-vs-data-analytics-vs-video-streams" },
            { text: "amazon-rds-vs-dynamodb", "link": "/amazon-rds-vs-dynamodb" },
            { text: "amazon-s3-vs-ebs-vs-efs", "link": "/amazon-s3-vs-ebs-vs-efs" },
            { text: "amazon-s3-vs-glacier", "link": "/amazon-s3-vs-glacier" },
            { text: "amazon-simple-workflow-swf-vs-aws-step-functions-vs-amazon-sqs", "link": "/amazon-simple-workflow-swf-vs-aws-step-functions-vs-amazon-sqs" },
            { text: "application-load-balancer-vs-network-load-balancer-vs-gateway-load-balancer", "link": "/application-load-balancer-vs-network-load-balancer-vs-gateway-load-balancer" },
            { text: "aws-cloudtrail-vs-amazon-cloudwatch", "link": "/aws-cloudtrail-vs-amazon-cloudwatch" },
            { text: "aws-datasync-vs-storage-gateway", "link": "/aws-datasync-vs-storage-gateway" },
            { text: "aws-global-accelerator-vs-amazon-cloudfront", "link": "/aws-global-accelerator-vs-amazon-cloudfront" },
            { text: "aws-secrets-manager-vs-systems-manager-parameter-store", "link": "/aws-secrets-manager-vs-systems-manager-parameter-store" },
            { text: "backup-and-restore-vs-pilot-light-vs-warm-standby-vs-multi-site", "link": "/backup-and-restore-vs-pilot-light-vs-warm-standby-vs-multi-site" },
            { text: "cloudwatch-agent-vs-ssm-agent-vs-custom-daemon-scripts", "link": "/cloudwatch-agent-vs-ssm-agent-vs-custom-daemon-scripts" },
            { text: "ebs-ssd-vs-hdd", "link": "/ebs-ssd-vs-hdd" },
            { text: "ec2-container-service-ecs-vs-lambda", "link": "/ec2-container-service-ecs-vs-lambda" },
            { text: "ec2-instance-health-check-vs-elb-health-check-vs-auto-scaling-and-custom-health-check", "link": "/ec2-instance-health-check-vs-elb-health-check-vs-auto-scaling-and-custom-health-check" },
            { text: "elastic-beanstalk-vs-cloudformation-vs-opsworks-vs-codedeploy", "link": "/elastic-beanstalk-vs-cloudformation-vs-opsworks-vs-codedeploy" },
            { text: "elb-health-checks-vs-route-53-health-checks-for-target-health-monitoring", "link": "/elb-health-checks-vs-route-53-health-checks-for-target-health-monitoring" },
            { text: "ervice-control-policies-scp-vs-iam-policies", "link": "/ervice-control-policies-scp-vs-iam-policies" },
            { text: "global-secondary-index-vs-local-secondary-index", "link": "/global-secondary-index-vs-local-secondary-index" },
            { text: "interface-endpoint-vs-gateway-endpoint-vs-gateway-load-balancer-endpoint", "link": "/interface-endpoint-vs-gateway-endpoint-vs-gateway-load-balancer-endpoint" },
            { text: "latency-routing-vs-geoproximity-routing-vs-geolocation-routing", "link": "/latency-routing-vs-geoproximity-routing-vs-geolocation-routing" },
            { text: "redis-append-only-files-vs-redis-replication", "link": "/redis-append-only-files-vs-redis-replication" },
            { text: "redis-cluster-mode-enabled-vs-disabled-vs-memcached", "link": "/redis-cluster-mode-enabled-vs-disabled-vs-memcached" },
            { text: "s3-pre-signed-urls-vs-cloudfront-signed-urls-vs-origin-access-identity-oai-origin-access-control-oac", "link": "/s3-pre-signed-urls-vs-cloudfront-signed-urls-vs-origin-access-identity-oai-origin-access-control-oac" },
            { text: "s3-standard-vs-s3-standard-ia-vs-s3-one-zone-ia", "link": "/s3-standard-vs-s3-standard-ia-vs-s3-one-zone-ia" },
            { text: "s3-transfer-acceleration-vs-direct-connect-vs-vpn-vs-snowball-vs-snowmobile", "link": "/s3-transfer-acceleration-vs-direct-connect-vs-vpn-vs-snowball-vs-snowmobile" },
            { text: "security-group-vs-nacl", "link": "/security-group-vs-nacl" },
            { text: "sni-custom-ssl-vs-dedicated-ip-custom-ssl", "link": "/sni-custom-ssl-vs-dedicated-ip-custom-ssl" },
            { text: "step-scaling-vs-simple-scaling-policies-in-amazon-ec2", "link": "/step-scaling-vs-simple-scaling-policies-in-amazon-ec2" },
            { text: "vpc-interface-endpoint-vs-gateway-endpoint-in-aws", "link": "/vpc-interface-endpoint-vs-gateway-endpoint-in-aws" }
          ]
      },
      {
        text: "compute-services",
        collapsed: true,
        base: 'th/aws/my-docs/compute-services',
        items: [
            { text: "batch", "link": "/batch" },
            { text: "beanstalks", "link": "/beanstalks" },
            { text: "ec2", "link": "/ec2" },
            { text: "ecr", "link": "/ecr" },
            { text: "ecs", "link": "/ecs" },
            { text: "eks", "link": "/eks" },
            { text: "fargate", "link": "/fargate" },
            { text: "lambda", "link": "/lambda" },
            { text: "lightsail", "link": "/lightsail" },
            { text: "parallelcluster", "link": "/parallelcluster" },
            { text: "sam", "link": "/sam" },
            { text: "sar", "link": "/sar" },
            { text: "savings-plan", "link": "/savings-plan" },
            { text: "wavelength", "link": "/wavelength" }
          ]
      },
      {
        text: "database-services",
        collapsed: true,
        base: 'th/aws/my-docs/database-services',
        items: [
            { text: "amazon-aurora", "link": "/amazon-aurora" },
            { text: "amazon-documentdb", "link": "/amazon-documentdb" },
            { text: "amazon-rds", "link": "/amazon-rds" },
            { text: "dynamodb", "link": "/dynamodb" },
            { text: "elasticache", "link": "/elasticache" },
            { text: "memorydb", "link": "/memorydb" },
            { text: "neptune", "link": "/neptune" },
            { text: "redshift-serverless", "link": "/redshift-serverless" },
            { text: "redshift", "link": "/redshift" }
          ]
      },
      {
        text: "desktop-and-app-streaming",
        collapsed: true,
        base: 'th/aws/my-docs/desktop-and-app-streaming',
        items: [
            { text: "amazon-workspaces", "link": "/amazon-workspaces" }
          ]
      },
      {
        text: "developer-tools",
        collapsed: true,
        base: 'th/aws/my-docs/developer-tools',
        items: [
            { text: "aws-appconfig", "link": "/aws-appconfig" },
            { text: "aws-codebuild", "link": "/aws-codebuild" },
            { text: "aws-codecommit", "link": "/aws-codecommit" },
            { text: "aws-codedeploy", "link": "/aws-codedeploy" },
            { text: "aws-codepipeline", "link": "/aws-codepipeline" },
            { text: "aws-codestar", "link": "/aws-codestar" },
            { text: "aws-x-ray", "link": "/aws-x-ray" }
          ]
      },
      {
        text: "front-end-web-and-mobile-services",
        collapsed: true,
        base: 'th/aws/my-docs/front-end-web-and-mobile-services',
        items: [
            { text: "aws-amplify", "link": "/aws-amplify" },
            { text: "aws-appsync", "link": "/aws-appsync" },
            { text: "aws-device-farm", "link": "/aws-device-farm" }
          ]
      },
      {
        text: "machine-learning-and-ai",
        collapsed: true,
        base: 'th/aws/my-docs/machine-learning-and-ai',
        items: [
            { text: "amazon-augmented-ai-a2i", "link": "/amazon-augmented-ai-a2i" },
            { text: "amazon-bedrock-agentcore-browser-tool", "link": "/amazon-bedrock-agentcore-browser-tool" },
            { text: "amazon-bedrock-agentcore-code-interpreter", "link": "/amazon-bedrock-agentcore-code-interpreter" },
            { text: "amazon-bedrock-agentcore-gateway", "link": "/amazon-bedrock-agentcore-gateway" },
            { text: "amazon-bedrock-agentcore-identity", "link": "/amazon-bedrock-agentcore-identity" },
            { text: "amazon-bedrock-agentcore-memory", "link": "/amazon-bedrock-agentcore-memory" },
            { text: "amazon-bedrock-agentcore-observability", "link": "/amazon-bedrock-agentcore-observability" },
            { text: "amazon-bedrock-agentcore-runtime", "link": "/amazon-bedrock-agentcore-runtime" },
            { text: "amazon-bedrock-agentcore", "link": "/amazon-bedrock-agentcore" },
            { text: "amazon-bedrock-flows", "link": "/amazon-bedrock-flows" },
            { text: "amazon-bedrock-knowledge-bases", "link": "/amazon-bedrock-knowledge-bases" },
            { text: "amazon-bedrock-prompt-management", "link": "/amazon-bedrock-prompt-management" },
            { text: "amazon-bedrock", "link": "/amazon-bedrock" },
            { text: "amazon-codeguru-profiler", "link": "/amazon-codeguru-profiler" },
            { text: "amazon-codeguru-reviewer", "link": "/amazon-codeguru-reviewer" },
            { text: "amazon-codeguru-security", "link": "/amazon-codeguru-security" },
            { text: "amazon-comprehend-medical", "link": "/amazon-comprehend-medical" },
            { text: "amazon-comprehend", "link": "/amazon-comprehend" },
            { text: "amazon-devops-guru", "link": "/amazon-devops-guru" },
            { text: "amazon-elastic-inference", "link": "/amazon-elastic-inference" },
            { text: "amazon-fraud-detector", "link": "/amazon-fraud-detector" },
            { text: "amazon-kendra", "link": "/amazon-kendra" },
            { text: "amazon-lex", "link": "/amazon-lex" },
            { text: "amazon-personalize", "link": "/amazon-personalize" },
            { text: "amazon-polly", "link": "/amazon-polly" },
            { text: "amazon-q", "link": "/amazon-q" },
            { text: "amazon-rekognition.", "link": "/amazon-rekognition." },
            { text: "amazon-sagemaker-clarify", "link": "/amazon-sagemaker-clarify" },
            { text: "amazon-sagemaker-data-wrangler", "link": "/amazon-sagemaker-data-wrangler" },
            { text: "amazon-sagemaker-feature-store", "link": "/amazon-sagemaker-feature-store" },
            { text: "amazon-sagemaker", "link": "/amazon-sagemaker" },
            { text: "amazon-textract", "link": "/amazon-textract" },
            { text: "amazon-titan", "link": "/amazon-titan" },
            { text: "amazon-transcribe", "link": "/amazon-transcribe" },
            { text: "amazon-translate", "link": "/amazon-translate" },
            { text: "aws-agent-squad", "link": "/aws-agent-squad" },
            { text: "aws-ai-factories", "link": "/aws-ai-factories" },
            { text: "aws-deeplens", "link": "/aws-deeplens" },
            { text: "aws-healthlake", "link": "/aws-healthlake" },
            { text: "aws-healthscribe", "link": "/aws-healthscribe" },
            { text: "aws-strands-agents", "link": "/aws-strands-agents" }
          ]
      },
      {
        text: "management-tools",
        collapsed: true,
        base: 'th/aws/my-docs/management-tools',
        items: [
            { text: "amazon-cloudwatch", "link": "/amazon-cloudwatch" },
            { text: "amazon-managed-grafana", "link": "/amazon-managed-grafana" },
            { text: "amazon-managed-service-for-prometheus", "link": "/amazon-managed-service-for-prometheus" },
            { text: "aws-auto-scaling", "link": "/aws-auto-scaling" },
            { text: "aws-cloud-development-kit-cdk", "link": "/aws-cloud-development-kit-cdk" },
            { text: "aws-cloudformation", "link": "/aws-cloudformation" },
            { text: "aws-cloudshell", "link": "/aws-cloudshell" },
            { text: "aws-cloudtrail", "link": "/aws-cloudtrail" },
            { text: "aws-compute-optimizer", "link": "/aws-compute-optimizer" },
            { text: "aws-config", "link": "/aws-config" },
            { text: "aws-control-tower", "link": "/aws-control-tower" },
            { text: "aws-health", "link": "/aws-health" },
            { text: "aws-license-manager", "link": "/aws-license-manager" },
            { text: "aws-management-console", "link": "/aws-management-console" },
            { text: "aws-opsworks", "link": "/aws-opsworks" },
            { text: "aws-outposts", "link": "/aws-outposts" },
            { text: "aws-proton", "link": "/aws-proton" },
            { text: "aws-service-catalog", "link": "/aws-service-catalog" },
            { text: "aws-systems-manager", "link": "/aws-systems-manager" },
            { text: "aws-trusted-advisor", "link": "/aws-trusted-advisor" },
            { text: "aws-well-architected-tool", "link": "/aws-well-architected-tool" }
          ]
      },
      {
        text: "migration-and-transfer-services",
        collapsed: true,
        base: 'th/aws/my-docs/migration-and-transfer-services',
        items: [
            { text: "aws-application-discovery", "link": "/aws-application-discovery" },
            { text: "aws-application-migration-service", "link": "/aws-application-migration-service" },
            { text: "aws-database-migration", "link": "/aws-database-migration" },
            { text: "aws-datasync", "link": "/aws-datasync" },
            { text: "aws-migration-hub", "link": "/aws-migration-hub" },
            { text: "aws-migration-strategies", "link": "/aws-migration-strategies" },
            { text: "aws-server-migration-service-sms", "link": "/aws-server-migration-service-sms" },
            { text: "aws-transfer-family", "link": "/aws-transfer-family" },
            { text: "migration-evaluator", "link": "/migration-evaluator" }
          ]
      },
      {
        text: "networking-and-content-delivery",
        collapsed: true,
        base: 'th/aws/my-docs/networking-and-content-delivery',
        items: [
            { text: "amazon-api-gateway", "link": "/amazon-api-gateway" },
            { text: "amazon-cloudFront", "link": "/amazon-cloudFront" },
            { text: "amazon-route-53", "link": "/amazon-route-53" },
            { text: "amazon-vpc", "link": "/amazon-vpc" },
            { text: "aws-direct-connect", "link": "/aws-direct-connect" },
            { text: "aws-elastic-load-balancing", "link": "/aws-elastic-load-balancing" },
            { text: "aws-global-accelerator", "link": "/aws-global-accelerator" },
            { text: "aws-transit-gateway", "link": "/aws-transit-gateway" }
          ]
      },
      {
        text: "security-identity-services",
        collapsed: true,
        base: 'th/aws/my-docs/security-identity-services',
        items: [
            { text: "amazon-cloud-directory", "link": "/amazon-cloud-directory" },
            { text: "amazon-cognito", "link": "/amazon-cognito" },
            { text: "amazon-detective", "link": "/amazon-detective" },
            { text: "amazon-guardduty", "link": "/amazon-guardduty" },
            { text: "amazon-inspector", "link": "/amazon-inspector" },
            { text: "amazon-macie", "link": "/amazon-macie" },
            { text: "aws-artifact", "link": "/aws-artifact" },
            { text: "aws-audit-manager", "link": "/aws-audit-manager" },
            { text: "aws-certificate-manager", "link": "/aws-certificate-manager" },
            { text: "aws-cloudhsm", "link": "/aws-cloudhsm" },
            { text: "aws-directory-service", "link": "/aws-directory-service" },
            { text: "aws-firewall-manager", "link": "/aws-firewall-manager" },
            { text: "aws-identity-and-access-management-iam", "link": "/aws-identity-and-access-management-iam" },
            { text: "aws-kms", "link": "/aws-kms" },
            { text: "aws-network-firewall", "link": "/aws-network-firewall" },
            { text: "aws-organizations", "link": "/aws-organizations" },
            { text: "aws-resource-access-manager", "link": "/aws-resource-access-manager" },
            { text: "aws-secrets-manager", "link": "/aws-secrets-manager" },
            { text: "aws-security-hub", "link": "/aws-security-hub" },
            { text: "aws-shield", "link": "/aws-shield" },
            { text: "aws-waf", "link": "/aws-waf" }
          ]
      },
      {
        text: "storage-services",
        collapsed: true,
        base: 'th/aws/my-docs/storage-services',
        items: [
            { text: "aws-backup", "link": "/aws-backup" },
            { text: "aws-snowball", "link": "/aws-snowball" },
            { text: "ebs", "link": "/ebs" },
            { text: "efs", "link": "/efs" },
            { text: "elastic-disaster-recovery", "link": "/elastic-disaster-recovery" },
            { text: "fsx", "link": "/fsx" },
            { text: "s3-glacier", "link": "/s3-glacier" },
            { text: "s3", "link": "/s3" },
            { text: "snowmobile", "link": "/snowmobile" },
            { text: "storage-gateway", "link": "/storage-gateway" }
          ]
      },
      {
        text: "summay",
        collapsed: true,
        base: 'th/aws/my-docs/summay',
        items: [
            { text: "aws-cloudops-md-part1", "link": "/aws-cloudops-md-part1" },
            { text: "aws-cloudops-md-part2", "link": "/aws-cloudops-md-part2" },
            { text: "aws-cloudops-md-part3", "link": "/aws-cloudops-md-part3" },
            { text: "aws-cloudops-md-part4", "link": "/aws-cloudops-md-part4" },
            { text: "aws-cloudops-md-part5", "link": "/aws-cloudops-md-part5" },
            { text: "aws-cloudops-md-part6", "link": "/aws-cloudops-md-part6" },
            { text: "aws-cloudops-md-part7", "link": "/aws-cloudops-md-part7" },
          ]
      }      
    ]
  },                                 
] 
