import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule, TcpOrdersModule, TcpProductsModule } from './transports';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    NatsModule,
    TcpOrdersModule,
    TcpProductsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
