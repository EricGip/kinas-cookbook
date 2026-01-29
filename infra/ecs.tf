resource "aws_ecs_cluster" "this" {
    name = var.app_name
}

resource "aws_iam_role" "task_execution" {
    name = "${var.app_name}-task-exec"

    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
            Effect = "Allow"
            Principal = { Service = "ecs-tasks.amazonaws.com" }
            Action = "sts:AssumeRole"
        }]
    })
}

resource "aws_iam_role_policy_attachment" "task_exec_policy" {
    role = aws_iam_role.task_execution.name
    policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_cloudwatch_log_group" "this" {
    name = "/ecs/${var.app_name}"
}

resource "aws_ecs_task_definition" "this" {
    family = var.app_name
    requires_compatibilities = ["FARGATE"]
    network_mode = "awsvpc"
    cpu = 256
    memory = 512
    execution_role_arn = aws_iam_role.task_execution.arn

    container_definitions = jsonencode([
        {
            name = var.app_name
            image = "${aws_ecr_repository.this.repository_url}:latest"

            portMappings = [{
                containerPort = var.container_port
            }]

            logConfiguration = {
                logDriver = "awslogs"
                options = {
                    awslogs-group = aws_cloudwatch_log_group.this.name
                    awslogs-region = "us-west-2"
                    awslogs-stream-prefix = "ecs"
                }
            }
        }
    ])
}