"use client";

import Link from "next/link";
import { FiArrowRight, FiBox, FiShoppingBag, FiDollarSign, FiTrendingUp } from "react-icons/fi";

// Mock data extracted into proper variables
const dashboardData = {
  metrics: {
    totalProducts: { value: "1,247", trend: "+12%" },
    totalOrders: { value: "328", trend: "+8%" },
    totalRevenue: { value: "₱485K", trend: "+24%" },
    growthRate: { value: "15.2%", trend: "+3.5%" },
  },
  categories: [
    { id: 1, name: "Men's Wear", percentage: 45, colorClass: "bg-blue-500" },
    { id: 2, name: "Women's Wear", percentage: 35, colorClass: "bg-pink-500" },
    { id: 3, name: "Accessories", percentage: 20, colorClass: "bg-amber-500" },
  ],
  recentOrders: [
    { id: "2847", time: "2 hours ago", amount: "₱2,450.50" },
    { id: "2846", time: "4 hours ago", amount: "₱1,899.00" },
    { id: "2845", time: "6 hours ago", amount: "₱5,670.00" },
  ],
};

export default function AdminDashboard() {
  const { metrics, categories, recentOrders } = dashboardData;

  return (
    <div className="w-full flex flex-col pb-4 animate-in duration-300">
      <h1 className="text-3xl font-bold text-[#b81d24] mb-8 tracking-wide">
        Dashboard
      </h1>

      {/* ROW 1 - Key Metrics */}
      <div className="flex flex-col lg:flex-row gap-6 w-full mb-6">
        {/* Total Products Card */}
        <div className="w-full lg:w-1/4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Products</h2>
            <FiBox className="text-2xl text-blue-500" />
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-bold text-gray-900 tracking-tight">{metrics.totalProducts.value}</span>
            <span className="text-sm text-green-500 font-medium mb-1">{metrics.totalProducts.trend}</span>
          </div>
          <p className="text-gray-500 text-xs">Compared to last month</p>
        </div>

        {/* Total Orders Card */}
        <div className="w-full lg:w-1/4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Orders</h2>
            <FiShoppingBag className="text-2xl text-purple-500" />
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-bold text-gray-900 tracking-tight">{metrics.totalOrders.value}</span>
            <span className="text-sm text-green-500 font-medium mb-1">{metrics.totalOrders.trend}</span>
          </div>
          <p className="text-gray-500 text-xs">Compared to last month</p>
        </div>

        {/* Total Revenue Card */}
        <div className="w-full lg:w-1/4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Revenue</h2>
            {/* Note: Swapped to a generic Peso context, though you can keep FiDollarSign as a generic "money" icon or use FiCreditCard */}
            <FiDollarSign className="text-2xl text-green-500" /> 
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-bold text-gray-900 tracking-tight">{metrics.totalRevenue.value}</span>
            <span className="text-sm text-green-500 font-medium mb-1">{metrics.totalRevenue.trend}</span>
          </div>
          <p className="text-gray-500 text-xs">Compared to last month</p>
        </div>

        {/* Growth Trend Card */}
        <div className="w-full lg:w-1/4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Growth Rate</h2>
            <FiTrendingUp className="text-2xl text-orange-500" />
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-bold text-gray-900 tracking-tight">{metrics.growthRate.value}</span>
            <span className="text-sm text-green-500 font-medium mb-1">{metrics.growthRate.trend}</span>
          </div>
          <p className="text-gray-500 text-xs">Monthly growth trajectory</p>
        </div>
      </div>

      {/* ROW 2 - Charts and Analytics */}
      <div className="flex flex-col lg:flex-row gap-6 w-full items-stretch">
        
        {/* Left: Revenue Breakdown */}
        <div className="w-full lg:w-6/12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">Revenue by Category</h2>
          
          <div className="space-y-4 flex-1">
            {categories.map((category) => (
              <div key={category.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">{category.name}</span>
                  <span className="text-sm font-bold text-gray-900">{category.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`${category.colorClass} h-full rounded-full`} 
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="w-full lg:w-6/12 flex flex-col gap-6">
          {/* Recent Orders Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col flex-1 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
              <Link href="/admin/orders" className="text-xs text-[#b81d24] font-semibold hover:underline">
                View All →
              </Link>
            </div>
            
            <div className="space-y-3 flex-1">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-gray-800">Order #{order.id}</p>
                    <p className="text-xs text-gray-500">{order.time}</p>
                  </div>
                  <span className="text-sm font-bold text-green-600">{order.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/admin/products" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-[#b81d24] group flex flex-col cursor-pointer">
              <FiBox className="text-2xl text-blue-500 mb-3" />
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Manage Products</h3>
              <p className="text-xs text-gray-500">Edit or add new items</p>
              <FiArrowRight className="text-gray-400 group-hover:text-[#b81d24] mt-auto transition-colors" />
            </Link>

            <Link href="/admin/inventory" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-[#b81d24] group flex flex-col cursor-pointer">
              <FiShoppingBag className="text-2xl text-purple-500 mb-3" />
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Check Inventory</h3>
              <p className="text-xs text-gray-500">View stock levels</p>
              <FiArrowRight className="text-gray-400 group-hover:text-[#b81d24] mt-auto transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}