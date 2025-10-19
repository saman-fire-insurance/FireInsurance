﻿using Common.Data.Converters;
using Microsoft.EntityFrameworkCore;

namespace Common.Data
{
    public abstract class BaseDbContext<TContext>(DbContextOptions<TContext> options)
        : DbContext(options), IBaseDbContext where TContext
        : DbContext
    {
        public async Task BeginTransactionAsync(CancellationToken cancellationToken = default)
        {
            var currentTransaction = Database.CurrentTransaction;

            if (currentTransaction is not null)
            {
                return;
            }

            await Database
                .BeginTransactionAsync(cancellationToken)
                .ConfigureAwait(false);
        }

        public async Task CommitTransactionAsync(CancellationToken cancellationToken)
        {
            var currentTransaction = Database.CurrentTransaction;

            if (currentTransaction is null)
            {
                return;
            }

            try
            {
                await currentTransaction.CommitAsync(cancellationToken);
            }
            catch (Exception)
            {
                await currentTransaction.RollbackAsync(cancellationToken);
                throw;
            }
            finally
            {
                await currentTransaction.DisposeAsync();
            }
        }

        public async Task RollbackTransactionAsync(CancellationToken cancellationToken)
        {
            var currentTransaction = Database.CurrentTransaction;

            if (currentTransaction is null)
            {
                return;
            }

            try
            {
                await currentTransaction.RollbackAsync(cancellationToken);
            }
            finally
            {
                await currentTransaction.DisposeAsync();
            }
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder.Properties<string>()
                .HaveConversion<PersianStringConverter>();
        }
    }
}