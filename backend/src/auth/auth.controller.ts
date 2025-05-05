import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../common/decorators/get-user.decorator";
import { User } from "../users/schemas/user.schema";

@ApiTags("auth")
@Controller("auth")
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User registered successfully." })
  @ApiResponse({ status: 400, description: "Bad request." })
  @ApiResponse({ status: 409, description: "Email already in use." })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("login")
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login a user" })
  @ApiResponse({ status: 200, description: "User logged in successfully." })
  @ApiResponse({ status: 401, description: "Invalid credentials." })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("verify-token")
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify JWT token" })
  @ApiResponse({ status: 200, description: "Token is valid." })
  @ApiResponse({ status: 401, description: "Invalid or expired token." })
  verifyToken(@GetUser() user: User) {
    return { id: user._id, name: user.name, email: user.email };
  }
}
