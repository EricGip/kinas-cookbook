resource "aws_security_group" "alb" {
    vpc_id = aws_vpc.this.id

    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_lb" "this" {
    name = var.app_name
    load_balancer_type = "application"
    subnets = aws_subnet.public[*].id
    security_groups = [aws_security_group.alb.id]
}

resource "aws_lb_target_group" "this" {
    port = var.container_port
    protocol = "HTTP"
    vpc_id = aws_vpc.this.id
    target_type = "ip"
}

resource "aws_lb_listener" "http" {
    load_balancer_arn = aws_lb.this.arn
    port = 80
    protocol = "HTTP"

    default_action {
        type = "forward"
        target_group_arn = aws_lb_target_group.this.arn
    }
} 

resource "aws_ecs_service" "this" {
    name = var.app_name
    cluster = aws_ecs_cluster.this.id
    task_definition = aws_ecs_task_definition.this.arn
    desired_count = 1
    launch_type = "FARGATE"

    network_configuration {
      subnets = aws_subnet.public[*].id
      security_groups = [aws_security_group.alb.id]
      assign_public_ip = true
    }

    load_balancer {
      target_group_arn = aws_lb_target_group.this.arn
      container_name = var.app_name
      container_port = var.container_port
    }
}