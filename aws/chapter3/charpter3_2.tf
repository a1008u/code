# instance
resource "aws_instance" "web_part3" {
  ami             = "${lookup(var.amis, var.region)}"
  instance_type   = "t2.micro"
  key_name        = "testkey"
  security_groups = ["${aws_security_group.WEB-SG_part3.id}"]
  subnet_id       = "${aws_subnet.public_part3.id}"

  tags {
    Name = "web_part3"
  }
}

# key_pair
resource "aws_key_pair" "auth_part3" {
  key_name   = "${var.key_name}"
  public_key = "${file(var.public_key_path)}"
}

# eip_association
resource "aws_eip_association" "eip_assoc_part3" {
  instance_id   = "${aws_instance.web_part3.id}"
  allocation_id = "eipalloc-03db255a0a65c4686"
}





# security_group
resource "aws_security_group" "WEB-SG_part3" {
  vpc_id = "${aws_vpc.VPC_part3.id}"
  name   = "WEB-SG"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags {
    Name = "WEB-SG_part3"
  }
}

# subnet(private)
resource "aws_subnet" "private_part3" {
  vpc_id            = "${aws_vpc.VPC_part3.id}"
  cidr_block        = "10.0.100.0/24"
  availability_zone = "ap-northeast-1a"

  tags {
    Name = "private_part3"
  }
}
