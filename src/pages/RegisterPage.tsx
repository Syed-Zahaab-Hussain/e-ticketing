import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, Bus, CheckCircle } from 'lucide-react';
import { registerUser } from '@/lib/auth-storage';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['PASSENGER', 'BUS_OPERATOR'], {
    required_error: 'Please select a role',
  }),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      const response = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      });
      
      if (response.success && response.user) {
        setAuthSuccess(response.message);
        
        // Redirect based on user role
        setTimeout(() => {
          switch (response.user?.role) {
            case 'ADMIN':
              navigate('/admin/dashboard');
              break;
            case 'BUS_OPERATOR':
              navigate('/operator/dashboard');
              break;
            case 'PASSENGER':
              navigate('/passenger/dashboard');
              break;
            default:
              navigate('/dashboard');
          }
        }, 1500);
      } else {
        setAuthError(response.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/20 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23023669&quot; fill-opacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
</div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
              <Bus className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Join E-Ticket
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Create your account to start booking bus tickets
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Success Message */}
              {authSuccess && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{authSuccess}</AlertDescription>
                </Alert>
              )}

              {/* Error Message */}
              {authError && (
                <Alert variant="destructive">
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="pl-10 h-12"
                      {...register('firstName')}
                    />
                  </div>
                  {errors.firstName && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">
                        {errors.firstName.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="h-12"
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">
                        {errors.lastName.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10 h-12"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors.email.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="pl-10 h-12"
                    {...register('phone')}
                  />
                </div>
                {errors.phone && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors.phone.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Account Type
                </Label>
                <Select onValueChange={(value) => setValue('role', value as 'PASSENGER' | 'BUS_OPERATOR')}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PASSENGER">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Passenger</span>
                        <span className="text-xs text-muted-foreground">Book and manage your trips</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="BUS_OPERATOR">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Bus Operator</span>
                        <span className="text-xs text-muted-foreground">Manage buses and routes</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors.role.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Password Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      className="pl-10 pr-10 h-12"
                      {...register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">
                        {errors.password.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10 h-12"
                      {...register('confirmPassword')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">
                        {errors.confirmPassword.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="agreeToTerms"
                  {...register('agreeToTerms')}
                  className="mt-1"
                />
                <div className="text-sm">
                  <Label htmlFor="agreeToTerms" className="text-foreground cursor-pointer">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:text-primary/80 underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary hover:text-primary/80 underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>
              {errors.agreeToTerms && (
                <Alert variant="destructive" className="py-2">
                  <AlertDescription className="text-sm">
                    {errors.agreeToTerms.message}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}