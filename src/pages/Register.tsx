
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';

const Register = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{t('auth.createAccount')}</CardTitle>
          <CardDescription>{t('auth.enterInformation')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{t('contact.fullName')}</Label>
                <Input id="name" type="text" placeholder={t('auth.namePlaceholder')} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{t('contact.email')}</Label>
                <Input id="email" type="email" placeholder={t('auth.emailPlaceholder')} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">{t('auth.passwordPlaceholder')}</Label>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full">{t('common.register')}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
