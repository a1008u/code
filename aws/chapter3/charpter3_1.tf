# vpc
resource "aws_vpc" "VPC_part3" {
  cidr_block           = "10.0.0.0/16"
  instance_tenancy     = "default"
  enable_dns_support   = "true"
  enable_dns_hostnames = "false"

  tags {
    Name = "VPC_part3"
  }
}

# getway
resource "aws_internet_gateway" "myGW_part3" {
  vpc_id = "${aws_vpc.VPC_part3.id}"

  tags {
    Name = "myGW_part3"
  }
}

# subnet
resource "aws_subnet" "public_part3" {
  vpc_id            = "${aws_vpc.VPC_part3.id}"
  cidr_block        = "10.0.1.0/24"
  availability_zone = "ap-northeast-1a"

  tags {
    Name = "public_part3"
  }
}

# route_table
resource "aws_route_table" "public-route_part3" {
  vpc_id = "${aws_vpc.VPC_part3.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.myGW_part3.id}"
  }

  tags {
    Name = "public-route_part3"
  }
}

# route_table_association

resource "aws_route_table_association" "public_route_part3" {
  route_table_id = "${aws_route_table.public-route_part3.id}"
  subnet_id      = "${aws_subnet.public_part3.id}"
}
