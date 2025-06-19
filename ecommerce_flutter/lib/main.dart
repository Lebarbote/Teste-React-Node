import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'pages/products_page.dart';
import 'pages/cart_page.dart';
import 'pages/orders_page.dart';
import 'providers/cart_provider.dart';
import 'providers/orders_provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => CartProvider()),
        ChangeNotifierProvider(create: (_) => OrdersProvider()),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Ecommerce Flutter',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepOrange),
          useMaterial3: true,
        ),
        home: const ProductsPage(),
        routes: {
          CartPage.routeName: (ctx) => const CartPage(),
          OrdersPage.routeName: (ctx) => const OrdersPage(),
        },
      ),
    );
  }
}
