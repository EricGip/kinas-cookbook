resource "aws_vpc" "this" {
    cidr_block = "10.0.0.0/16"
    enable_dns_support = true
    enable_dns_hostnames = true
}

resource "aws_internet_gateway" "this" {
    vpc_id = aws_vpc.this.id
}

resource "aws_subnet" "public" {
    count = 2
    vpc_id = aws_vpc.this.id
    cidr_block = cidrsubnet(("10.0.0.0/16", 8, count.index)
    availability_zone = data.aws_availability_zones.availability.names[count.index]
    map_public_ip_on_launch = true
}

data "aws_availability_zones" "available" {}