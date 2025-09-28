using Ardalis.Result;
using FireInsurance.Insurance.Domain.Common.Messaging;
using FireInsurance.Insurance.Domain.Entities;
using FireInsurance.Insurance.Domain.Errors;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Data.Entity;

namespace FireInsurance.Insurance.Application.Identity.UseCases.Commands
{
    public sealed class SignUpCommand(string phoneNumber, string captchaToken) : ICommand<bool>
    {
        public string PhoneNumber { get; set; } = phoneNumber;

        public string CaptchaToken { get; set; } = captchaToken;

        internal sealed class Validator : AbstractValidator<SignUpCommand>
        {
            public Validator()
            {
                RuleFor(req => req.PhoneNumber)
                    .NotEmpty()
                    .WithMessage(UserErrors.PhoneNumber.Empty)
                    .Length(11)
                    .WithMessage(UserErrors.PhoneNumber.Invalid);

                //RuleFor(req => req.CaptchaToken)
                //    .NotEmpty()
                //    .WithMessage(UserErrors.ChaptchaToken.Empty);
            }
        }

        internal sealed class Handler(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IMediator _mediator,
            //ICaptchaValidator captchaValidator,
            //ILoginCodeStorer loginCodeStorer,
            //ISmsService smsProvider,
            ILogger<SignUpCommand> logger) : ICommandHandler<SignUpCommand, bool>
        {
            public async Task<Result<bool>> Handle(SignUpCommand request, CancellationToken cancellationToken)
            {
                //if (!(await captchaValidator.ValidateTokenAsync(request.CaptchaToken, CaptchaActions.SignUp)))
                //{
                //    return Result.Unauthorized();
                //}

                var user = await userManager.Users.FirstOrDefaultAsync(u => u.UserName == request.PhoneNumber, cancellationToken);
                // User is not created.
                if (user is null)
                {
                    // SignUp
                    var userResult = User.SignUp(request.PhoneNumber);
                    if (!userResult.IsSuccess)
                    {
                        logger.LogWarning("User registration failed validation for phone: {PhoneNumber}. Errors: {Errors}",
                            request.PhoneNumber, string.Join(", ", userResult.ValidationErrors.Select(e => e.ErrorMessage)));

                        return Result.Invalid(userResult.ValidationErrors);
                    }

                    user = userResult.Value;

                    if (!(await userManager.CreateAsync(user)).Succeeded)
                    {
                        return Result.Error(UserErrors.NotRegistered);
                    }
                }

                // Send code
                if (string.IsNullOrEmpty(user.PhoneNumber))
                {
                    logger.LogError($"User.PhoneNumber is null! user id: \"{user.PhoneNumber}\"");
                    return Result.Error(UserErrors.Code.NotSent);
                }

                var sendCodeResult = user.SendCode();
                if (!sendCodeResult.IsSuccess)
                {
                    return sendCodeResult;
                }

                var domainEvents = user.GetDomainEvents();
                logger.LogInformation("Processing {EventCount} domain events for user {UserId}", domainEvents.Count, user.Id);

                // Publish domain events
                foreach (var domainEvent in domainEvents)
                {
                    await _mediator.Publish(domainEvent, cancellationToken);
                }

                user.ClearDomainEvents();

                return Result.Success();
            }

            //private async Task<Result<bool>> SendOtpToUser(User user)
            //{
            //    if (string.IsNullOrEmpty(user.PhoneNumber))
            //    {
            //        logger.LogError($"User.PhoneNumber is null! user id: \"{user.PhoneNumber}\"");
            //        return Result.Error(UserErrors.Code.NotSent);
            //    }

            //    if (!user.CanSendCode(3))
            //    {
            //        return Result.Error(UserErrors.CodeSentRecently(3));
            //    }

            //    //var code = await loginCodeStorer.StoreAsync(user);
            //    //if (!code.IsSuccess)
            //    //{
            //    //    return Result.Error(new ErrorList(code.Errors));
            //    //}

            //    //var code = await userManager.GenerateChangePhoneNumberTokenAsync(user.Id, user.PhoneNumber);
            //    //if (!await smsProvider.SendCodeAsync(user.PhoneNumber, code))
            //    //{
            //    //    return Result.Error(UserErrors.Code.NotSent);
            //    //}

            //    user.SendCode();
            //    return Result.Success();
            //}
        }

    }
        //public record SignUpCommand(string PhoneNumber) : IRequest<Result<SignUpResponse>>;

        //public record SignUpResponse(
        //    Guid UserId,
        //    string PhoneNumber,
        //    DateTime CreatedAt,
        //    bool IsSuccess,
        //    string Message);

        //// Command Handler
        //public class SignUpCommandHandler : IRequestHandler<SignUpCommand, Result<SignUpResponse>>
        //{
        //    private readonly IUserRepository _userRepository;
        //    private readonly IUnitOfWork _unitOfWork;
        //    private readonly IMediator _mediator;
        //    private readonly ILogger<SignUpCommandHandler> _logger;

        //    public SignUpCommandHandler(
        //        IUserRepository userRepository,
        //        IUnitOfWork unitOfWork,
        //        IMediator mediator,
        //        ILogger<SignUpCommandHandler> logger)
        //    {
        //        _userRepository = userRepository;
        //        _unitOfWork = unitOfWork;
        //        _mediator = mediator;
        //        _logger = logger;
        //    }

        //    public async Task<Result<SignUpResponse>> Handle(SignUpCommand request, CancellationToken cancellationToken)
        //    {
        //        try
        //        {

        //            // 2. Check if user already exists (business rule)
        //            var existingUser = await _userRepository.GetByPhoneNumberAsync(request.PhoneNumber, cancellationToken);
        //            if (existingUser != null)
        //            {
        //                _logger.LogWarning("Registration attempt for existing phone number: {PhoneNumber}", request.PhoneNumber);
        //                return Result<SignUpResponse>.Conflict("User with this phone number already exists");
        //            }

        //            // 3. Persist user
        //            await _userRepository.AddAsync(user, cancellationToken);
        //            await _unitOfWork.SaveChangesAsync(cancellationToken);

        //            _logger.LogInformation("User {UserId} successfully persisted to database", user.Id);

        //            // 4. Process domain events - triggers all INotificationHandler implementations
        //            var domainEvents = user.GetDomainEvents();
        //            _logger.LogInformation("Processing {EventCount} domain events for user {UserId}",
        //                domainEvents.Count, user.Id);

        //            foreach (var domainEvent in domainEvents)
        //            {
        //                await _mediator.Publish(domainEvent, cancellationToken);
        //            }
        //            user.ClearDomainEvents();

        //            // 5. Return success response using Ardalis.Result
        //            var response = new SignUpResponse(
        //                UserId: Guid.Parse(user.Id),
        //                PhoneNumber: user.PhoneNumber!,
        //                CreatedAt: DateTime.UtcNow,
        //                IsSuccess: true,
        //                Message: "User SignUped successfully"
        //            );

        //            _logger.LogInformation("User registration completed successfully for {UserId}", user.Id);
        //            return Result<SignUpResponse>.Success(response);
        //        }
        //        catch (Exception ex)
        //        {
        //            _logger.LogError(ex, "Unexpected error during user registration for phone: {PhoneNumber}", request.PhoneNumber);
        //            return Result<SignUpResponse>.Error("An unexpected error occurred during sign up");
        //        }
        //    }
        //}
    }
